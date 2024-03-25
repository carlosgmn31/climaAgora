import axios from "axios";

const API_KEY = 'SUA-CHAVE'; 

const instance = axios.create({
    baseURL: 'https://api.hgbrasil.com/weather',
    params: {
        key: API_KEY
    }
});

const Clima = {
    getCidadePorNome: (NomeCidade:string) => {
        return instance.get('', {
            params: {
                city_name: NomeCidade
            }
        });
    }
}

export default Clima;
