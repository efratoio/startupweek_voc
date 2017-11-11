// import { convertCase } from "../api";
//
// describe("The Api store", () => {
//     describe("`convertBodyCasing`", () => {
//         [
//             { testTest123: 7, anotherTestTrickier: false },
//             { itHandlesNull: null, nocamelcase: "test" }, // tslint:disable-line
//             { recursivelyConverts: { anotherKey: { moreKeys: { a: "a" }}}},
//             { UpperCamelCase: "test", camelCaseInContent: "camelCase" },
//             { not_camel_case: "test" },
//             [ { a: null, b: "b" }, 8 ], // tslint:disable-line
//             90,
//             "test",
//             true,
//             [ 1, 2, 3, 4 ],
//             [ { a: [ null, null, null ] }, { a: { b: [ 5 ]}}], // tslint:disable-line
//         ].forEach((sample) => {
//             it(`correctly converts "${JSON.stringify(sample)}"`, () => {
//                 expect(convertCase(sample)).toMatchSnapshot();
//             });
//         });
//     });
// });
