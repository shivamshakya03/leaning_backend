import { fileURLToPath } from 'node:url';
import { dirname } from 'path'; 
import path from 'node:path';
import fs from 'fs';

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

    save(){
        Home.fetchAll(AllregisterHomes => {
            if (this.id) {
                AllregisterHomes = AllregisterHomes.map(home => {
                    return home.id === this.id ? this : home;
                });
            }
            else{
                this.id = Math.random().toString();
                AllregisterHomes.push(this);

            }
            fs.writeFile(HOME_FILE_PATH, JSON.stringify(AllregisterHomes), (err) => {
                console.log("Error While Writing FIle:", err)
            })
        })

    }

    static fetchAll(callback) {
        fs.readFile(HOME_FILE_PATH, (err,data) => {
            callback(!err ? JSON.parse(data) : [])
        })
    }

    static findById(id, callback) {

        Home.fetchAll(AllregisterHomes => {
            const homeFound = AllregisterHomes.find(home => home.id === id);
            callback(homeFound);
        })
    }

    static deleteById(id, callback) {
        Home.fetchAll(allHomes => {
            const updatedHomes = allHomes.filter(home => home.id !== id);
            fs.writeFile(HOME_FILE_PATH, JSON.stringify(updatedHomes, null, 2), err => {
                if (err) {
                    console.error('Error deleting home:', err);
                    return callback(err);
                }
                callback(null);
            });
        });
    }



}