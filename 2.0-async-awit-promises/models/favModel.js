import { fileURLToPath } from 'node:url';
import { dirname } from 'path'; 
import path from 'node:path';
import {promises as fs} from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FAVHOME_FILE_PATH = path.join(__dirname, '../data', 'favHome.json');

export default class favourite {
    constructor(favid) {
        this.favid = favid;
    }

    async save(){
        // favourite.fetchAll_ID(homesId => {
        //     homesId.push(this);
        //     fs.writeFile(FAVHOME_FILE_PATH, JSON.stringify(homesId), err => {
        //         console.log(err);
        //     })
        // })
        
        try{    
            const homesIds = await favourite.fetchAll_ID();
            homesIds.push(this);
            await fs.writeFile(FAVHOME_FILE_PATH, JSON.stringify(homesIds));
        } catch(err) {
            console.log(err);
        }
    }

    // static fetchAll_ID(callback) {
    //     fs.readFile(FAVHOME_FILE_PATH, (err, data) => {
    //         callback(!err ? JSON.parse(data) : []);
    //     });   
    // }
    static async fetchAll_ID() {
        try{
            const data = await fs.readFile(FAVHOME_FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch(err) {
            return [];
        }
        
    }

    static findById(id, callback) {

    }

    static async deleteById(id) {
        // favourite.fetchAll_ID(ids => {
        //     const updated = ids.filter(obj => obj.favid !== id);
        //     fs.writeFile(FAVHOME_FILE_PATH, JSON.stringify(updated), err => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     callback(); // Notify controller after deletion
        //     });
        // });

        try{
            const homeids = await favourite.fetchAll_ID();
            const updated = homeids.filter(obj => obj.favid !== id);
            await fs.writeFile(FAVHOME_FILE_PATH, JSON.stringify(updated));
        }catch(err) {
            console.log(err);
        }

    }



}