const lab = require("lab").script();
exports.lab = lab;

let Execute = require("../src/index");

lab.experiment("Middleware Test", () => {

    lab.test("should throw error when type is not defined", (done) => {
        let middleware = {

        };

        let execute = new Execute();
        try{
            execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("type is missing in middleware contract");
            done();
        }
    });

    lab.test("should throw error when type is unknown", (done) => {
        let middleware = {
            type: "Something-that-is-notin-the-list"
        };

        let execute = new Execute();
        try{
            execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("Unknown middleware type");
            done();
        }
    });

    lab.test("should throw error when type is 'action' and action is not defined", (done) => {
        let middleware = {
            type: "action"
        };

        let execute = new Execute();
        try{
            execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("middleware action is missing");
            done();
        }
    });

    lab.test("should throw error when type is 'action' and name is not defined", (done) => {
        let middleware = {
            type: "action",
            action: ()=>{}
        };

        let execute = new Execute();
        try{
            execute.use(middleware);
        }
        catch(e){
            lab.expect(e.message).to.equal("middleware name is missing");
            done();
        }
    });

    lab.test("should return true when type is 'action' and name and action are defined", (done) => {
        let middleware = {
            type: "action",
            name: "action1",
            action: ()=>{}
        };

        let execute = new Execute();
        let res = execute.use(middleware);
        lab.expect(res).to.equal(true);
        done();
    });
});