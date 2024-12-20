import { App } from "./app";
import { mongoDbConnection } from "./database/connection";
import { Config } from "./utils/config/env.config";

const app = App();

mongoDbConnection();

app.listen(Config.PORT, () => {
  console.log(`
	               __
	              /°_)
	     _.----._/ /
	    /         /
	 __/ (  | (  |
	/__.-'|_|--|_|
	@Github Bryansss1 ${Config.PORT}
    API REST prueba tecnica oberstaff
	`);
});
