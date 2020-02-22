import app from './app';
import {connection} from './database'

const main = async ()=>{
     app.listen(app.get('port'));
     console.log("server on http://localhost:"+app.get('port'))
     await connection();
}

main();