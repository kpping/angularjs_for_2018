const DI = [
    '$log',
];
export class LoremCtrl {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.greetOnInit();
    }

    greetOnInit() {
        this.$log.info('lorem');
    }
}
LoremCtrl.$inject = DI;
