import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Grid, Header, Input, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetAllTicket } from "../../services/ticket.service";
import { decrementQuantityTicket, GetTicketsAsync, incrementQuantityTicket, Ticket } from "./ticketSlice";




const TicketList: React.FC<{}> = ({ }) => {

    const dispatch = useAppDispatch();
    const { tickets } = useAppSelector(state => state.ticket)
    const  status  = useAppSelector(state => state.ticket.status)

   
    useEffect(() => {
        if(status === ""){
            dispatch(GetTicketsAsync());

        }
    }, [dispatch, status])
    return (
        <Container>
            <Segment className="bg-gray-700">
                <Header as="h3" dividing className="text-white uppercase">Chọn vé</Header>
                <Grid className="bg-gray-700" textAlign="left" verticalAlign="middle" container>
                    <Grid.Column computer={4} className="text-white font-extrabold text-xl">
                        Loại vé
                    </Grid.Column>

                    <Grid.Column textAlign="right" computer={2} className="text-white font-extrabold text-xl">
                        Giá
                    </Grid.Column>


                    <Grid.Column textAlign="right" computer={4} className="text-white font-extrabold text-xl">
                        Số lượng

                    </Grid.Column>

                    <Grid.Column computer={2} textAlign="right" className="text-white font-extrabold text-xl">
                        Tổng giá
                    </Grid.Column>

                </Grid>
                {tickets && tickets.map((ticket, idx) => (
                    <Grid key={idx} className="bg-gray-700" textAlign="left" verticalAlign="middle" container>
                        <Grid.Column computer={4} className="text-white">
                            {ticket.name}
                        </Grid.Column>

                        <Grid.Column textAlign="right" computer={2} className="text-white">
                            {ticket.price}đ
                        </Grid.Column>


                        <Grid.Column textAlign="right" computer={4}>
                            <div className="flex justify-end">

                                <Button className="m-0" icon='plus' onClick={() => { dispatch(incrementQuantityTicket({id: ticket.id})) }}></Button>
                                <Input className=" w-14 px-1" value={ticket!.quantity}/>
                                <Button icon='minus' onClick={() => { dispatch(decrementQuantityTicket({id: ticket.id})) }} ></Button>
                            </div>

                        </Grid.Column>

                        <Grid.Column textAlign="right" computer={2} className="text-white">
                            {ticket.total}đ
                        </Grid.Column>

                    </Grid>
                ))}
            </Segment>
        </Container>
    )
}

export default TicketList;