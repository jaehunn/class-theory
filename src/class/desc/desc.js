"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1. super() / this
{
    var A = /** @class */ (function () {
        function A(a) {
            this.a = a;
            this._a = "0G";
        }
        Object.defineProperty(A.prototype, "set_a", {
            set: function (_a) {
                this._a = _a;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(A.prototype, "get_a", {
            get: function () {
                return this._a;
            },
            enumerable: false,
            configurable: true
        });
        A.prototype.getA = function () {
            return this.a;
        };
        return A;
    }());
    var AA = /** @class */ (function (_super) {
        __extends(AA, _super);
        function AA(a) {
            var _this = _super.call(this, a) || this;
            _this.a = a;
            return _this;
        }
        AA.prototype.getInfo = function () {
            console.log(_super.prototype.getA.call(this), _super.prototype.a, this.getA(), this.a, (this.a = "1G"), _super.prototype.getA.call(this), _super.prototype.a, this.getA(), this.a);
        };
        return AA;
    }(A));
}
// 2. coupling: weak / strong
// 3. abstract / interface
// 4. overloading / overriding
// 5.singleton: eager / lazy
// 6. readonly / const
