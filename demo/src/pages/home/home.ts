import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hand:any
  constructor(
    public navCtrl: NavController,
    public socket: Socket
  ) {
    this.getObj().subscribe(hand => {
      this.hand = hand;
      console.log( hand )
    });

  }
  getObj() {
    let observable = new Observable(observer => {
      this.socket.on('hand', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
}
