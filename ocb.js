let Segment = function(opt) {
    this.el = document.querySelector(opt.el);
    this.init(opt);
}

Segment.prototype = {
    init(opt) {
        this.el.style.position = "relative";
        this.el.style.width = `${opt.width}px`;
        this.el.style.height = `${opt.height}px`;
        this.el.style.background = opt.leftColor;
        this.minDeg = Math.round(Math.atan2(opt.height, opt.width) * 180 / Math.PI);
        this.maxDeg = 180 - this.minDeg;
        this.drawRight(opt);
    },
    drawRight(opt) {
        document.styleSheets[0].removeRule(`${opt.el}::after`);
        let deg = opt.deg > 90 ? 180 - opt.deg : opt.deg;
        let k = Math.tan(deg * Math.PI / 180);
        let minK = opt.height / opt.width;
        k = k < minK ? minK : k;
        opt.rightTopWidth = deg != 90 ? opt.width / 2 - opt.height / (2 * k) : opt.width / 2;
        let cssRule = [
            `position: absolute`,
            `right: 0`,
            `bottom: 0`,
            `width: ${opt.rightTopWidth}px`,
            `border-left: ${opt.width - 2 * opt.rightTopWidth}px solid transparent`,
            `border-bottom: ${opt.height}px solid ${opt.rightColor}`,
            `content: ""`,
        ];
        opt.deg > 90 ? cssRule.push(`transform: rotateX(180deg);`) : true;
        document.styleSheets[0].insertRule(`${opt.el}::after{${cssRule.join(';')}}`, 0);
    }
}
