import http from "../common/http-common";
import { Ticket } from "../slices/tickets/ticketSlice";




export async function GetAllTicket() {
   
    var response = http.get<Ticket[]>("/api/tickets/");

    return response;
    
    // }
}