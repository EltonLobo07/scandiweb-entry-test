import axios from "axios";
import { GET_CATEGORY_NAMES } from "./queries";

const BASE_URL = "http://localhost:4000";

async function getCategoryNames() {
    try {
        const response = await axios.post(BASE_URL, {query: GET_CATEGORY_NAMES});
        return response.data.data.categories.map(category => category.name);
    }
    catch(err) {
        throw err;
    }
};

const obj = {getCategoryNames};

export default obj;
