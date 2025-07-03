import { fileURLToPath } from 'node:url';
import { dirname } from 'path'; 
import path from 'node:path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const HOME_FILE_PATH = path.join(__dirname, '../data', 'home.json');

export default class Home {
    constructor(housename, location, price, nights, rating, description) {
        this.housename = housename;
        this.location = location;
        this.price = price;
        this.nights = nights;
        this.rating = rating;
        this.description = description;
    }

    // save(){
    //     Home.fetchAll(AllregisterHomes => {
    //         if (this.id) {
    //             AllregisterHomes = AllregisterHomes.map(home => {
    //                 return home.id === this.id ? this : home;
    //             });
    //         }
    //         else{
    //             this.id = Math.random().toString();
    //             AllregisterHomes.push(this);

    //         }
    //         fs.writeFile(HOME_FILE_PATH, JSON.stringify(AllregisterHomes), (err) => {
    //             console.log("Error While Writing FIle:", err)
    //         })
    //     })

    // }


    async save(){
        try {
            // const data = await fs.readFile(HOME_FILE_PATH, 'utf-8');
            // let homes = JSON.parse(data);
            let homes = await Home.fetchAll();

            if(this.id) {
                homes = homes.map(home => home.id === this.id ? this : home); 
            }
            else {
                this.id = Math.random().toString();
                homes.push(this);
            }

            await fs.writeFile(HOME_FILE_PATH, JSON.stringify(homes));

        } catch(err) {
            console.error("Error While Saving:", err);
        }
    }

    // static fetchAll(callback) {
    //     fs.readFile(HOME_FILE_PATH, (err,data) => {
    //         callback(!err ? JSON.parse(data) : [])
    //     })
    // }

    static async fetchAll() {
        try{
            const data = await fs.readFile(HOME_FILE_PATH ,'utf-8');
            return JSON.parse(data);
        } catch(err) {
            console.error('error reading homes: ', err);
            return [];
        }
    }

    // static findById(id, callback) {

    //     Home.fetchAll(AllregisterHomes => {
    //         const homeFound = AllregisterHomes.find(home => home.id === id);
    //         callback(homeFound);
    //     })
    // }

    static async findById(id) {

       const homes = await Home.fetchAll();
       return homes.find(home => home.id === id);
    }

    // static deleteById(id, callback) {
    //     Home.fetchAll(allHomes => {
    //         const updatedHomes = allHomes.filter(home => home.id !== id);
    //         fs.writeFile(HOME_FILE_PATH, JSON.stringify(updatedHomes, null, 2), err => {
    //             if (err) {
    //                 console.error('Error deleting home:', err);
    //                 return callback(err);
    //             }
    //             callback(null);
    //         });
    //     });
    // }

    static async deleteById(id) {
    
        try {
                const homes = await Home.fetchAll();
                const updatedHomes = homes.filter(home => home.id !== id);
                await fs.writeFile(HOME_FILE_PATH, JSON.stringify(updatedHomes));
    
        } catch (err) {
            console.error('Erroe While Deleteing HOme: ', err );
            throw err;
        }
    }


}