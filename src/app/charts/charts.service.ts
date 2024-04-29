import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BACKEND_URL, VOTES_API } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private socket: Socket;
  public votes: {listName: string, numberVotes: number, colorcode: string}[] = [];

  constructor(private httpClient: HttpClient) {
    // Connect to the server
    this.socket = io(BACKEND_URL);

    // Listen for 'votes' event from the server
    this.socket.on('votes', (data: {listName: string, numberVotes: number, colorcode: string}[]) => {
      console.log('Received JSON data from server:', data);
      // Handle the received JSON data here
      this.votes = data;
    });
  }

  getChartInfo() {
    //return this.httpClient.get(VOTES_API);
    return this.votes;
  }
}
