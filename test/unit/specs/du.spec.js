import libs from '../../../src/webapp/libs/lib';
describe("函数式 提纯基础测试", function() {
    it("Store内增函数测试", function() {
        expect(libs.increment(1)).toBe(2);
    });
    it("Store内减函数测试", function() {
        expect(libs.decrement(2)).toBe(1);
    });
});