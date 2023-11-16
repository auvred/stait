import { fileURLToPath } from 'node:url'

import { format } from 'prettier'
import * as ts from 'typescript'
import { expect, it } from 'vitest'

const EXPECT_TYPE_PREFIX = 'ExpectType_'
const EXPECT_ERROR_PREFIX = 'ExpectError_'

export function runTypesTests(fileUrl: string): void {
  const filePath = fileURLToPath(fileUrl)

  const program = ts.createProgram([filePath], {})
  const checker = program.getTypeChecker()

  const sourceFile = program.getSourceFile(filePath)
  const diagnostics = program.getSemanticDiagnostics(sourceFile)
  sourceFile?.forEachChild(node => {
    if (!ts.isTypeAliasDeclaration(node)) {
      return
    }

    if (node.name.text.startsWith(EXPECT_TYPE_PREFIX)) {
      runExpectType({ node, checker })
    } else if (node.name.text.startsWith(EXPECT_ERROR_PREFIX)) {
      runExpectError({ node, diagnostics })
    }
  })
}

ts

function runExpectType({
  node,
  checker,
}: {
  node: ts.TypeAliasDeclaration
  checker: ts.TypeChecker
}): void {
  const testCaseRawName = node.name.text.slice(EXPECT_TYPE_PREFIX.length)

  it('type: ' + testCaseRawName.replaceAll('_', ' '), async () => {
    /**
     * TODO: the current snapshot of type is slightly different from the one
     * shown in the IDE when hovering over the type. We probably need to
     * investigate this (maybe use `getQuickInfoAtPosition`?)
     */
    expect(
      await format(
        `type ${testCaseRawName} = ${checker.typeToString(
          checker.getTypeAtLocation(node),
          undefined,
          ts.TypeFormatFlags.InTypeAlias |
            ts.TypeFormatFlags.MultilineObjectLiterals |
            ts.TypeFormatFlags.NoTruncation,
        )}`,
        {
          parser: 'typescript',
          semi: false,
          singleQuote: true,
          // it'd be easier to read if each property will be placed on its own line
          printWidth: 1,
        },
      ),
    ).toMatchSnapshot()
  })
}

function runExpectError({
  node,
  diagnostics,
}: {
  node: ts.TypeAliasDeclaration
  diagnostics: readonly ts.Diagnostic[]
}): void {
  const testCaseRawName = node.name.text.slice(EXPECT_ERROR_PREFIX.length)

  it('error: ' + testCaseRawName.replaceAll('_', ' '), () => {
    const diagnostic = diagnostics.find(
      d =>
        d.start !== undefined &&
        d.length !== undefined &&
        node.pos <= d.start &&
        node.end >= d.start + d.length,
    )

    if (!diagnostic) {
      throw new Error('No tsc error found!')
    }

    const formattedDiagnostic = ts.formatDiagnostic(diagnostic, {
      getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
      getNewLine: () => ts.sys.newLine,
      getCanonicalFileName: filename => filename,
    })
    expect(
      formattedDiagnostic.slice(formattedDiagnostic.indexOf(': error') + 2),
    ).toMatchSnapshot()
  })
}
