import http from "@/http-common";
import type Hero from "../types/Hero";

class HeroDataService {
    getAll(): Promise<any> {
        return http.get("/heroes");
    }

    get(id: number): Promise<any> {
        return http.get(`/heroes/${id}`);
    }

    create(data: Hero): Promise<any> {
        return http.post("/heroes", data);
    }

    update(id: number, data: Hero): Promise<any> {
        return http.put(`/heroes/${id}`, data);
    }

    delete(id: number): Promise<any> {
        return http.delete(`/heroes/${id}`);
    }
}
export default new HeroDataService();