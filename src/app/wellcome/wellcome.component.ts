import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
// import { faL } from '@fortawesome/free-solid-svg-icons';


export interface Message {
  content: string;
  isSentByUser: boolean;
}


@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  myID !: any;

  userData !: any;

  first = "";

  last = "";

  home !: boolean;

  profile !: boolean;

  editProfile !: boolean;

  alertArray !: any;

  announce !: any;

  oldID : any = [];

  announcements !: any;

  items : any;

  updatedArray = [];

  session : any = [0];

  z : any = [];

  rem = 'inline';

  visible : boolean = true;

  constructor(@Inject(LOCALE_ID) public locale : string) {

    const today = new Date();

    const curr = formatDate(today,'yyyy-MM-dd',this.locale);

    this.announce = JSON.parse(localStorage.getItem('Announce') || '{}');

    this.oldID = sessionStorage.getItem("id's");

    this.items = JSON.parse(sessionStorage.getItem("id's") || "{}");

    let size = this.announce.length;

    // for(let i = 0; i < size; i++){

    //   for(let j = 0; j < 2; j++){

    //     if(this.announce[i].id == this.items[j]){

    //       console.log("Annonce : ", this.announce[i].id);

    //       console.log("Item: ",this.items[j]);

    //       break;
    //     }
    //     // if(this.announce[i].id != this.items[j]){

    //     //   this.updatedArray = [...this.updatedArray,this.announce[i]];

    //     //   break;
    //     // }

    //     if(j == 1){

    //       this.updatedArray = [...this.updatedArray,this.announce[i]];
    //     }
    //   }
    // }

    let y : any = [];

    for(let i = 0;i < size; i++){

      if(this.announce[i].strtDate <= curr && this.announce[i].edDate >= curr){

        // if(sessionStorage.getItem('Announcements')){

        //   y = JSON.parse(sessionStorage.getItem('Announcements') || '{}');

        //   y = [...y,this.announce[i]]; 
        // }
        // else{

        //   y = [this.announce[i]]
        // }

        y = [...y,this.announce[i]];

      }
    }

    window.onload = function(){

      sessionStorage.setItem('Announcements',JSON.stringify(y));
    }

    this.z = JSON.parse(sessionStorage.getItem('Announcements') || '{}');
  }
 
  ngOnInit(): void {

    this.myID = JSON.parse(localStorage.getItem('Users') || '{}');

    let x = this.myID.length;

    this.userData = JSON.parse(localStorage.getItem('loged') || '{}');


    for(let i = 0; i < x; i++){

      if(this.myID[i].email === this.userData){

        this.first = this.myID[i].fname;

        this.last = this.myID[i].lname;

      }

    }

    // this.first = this.userData.fname;

    // this.last = this.userData[0].lname;

    // alert((this.first));

    // alert((this.last));


  }

  // Attribute Directive

  // @HostListener('mousehover') mousehover(eventData : Event){

  //   this.rendrer.setStyle(this.eleRef.nativeElement, 'background-color', 'red');
  // }

  removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }


  remove(id : any){

    this.z =  this.removeObjectWithId(this.z,id);

    console.log(this.announcements);

    sessionStorage.setItem('Announcements',JSON.stringify(this.z));

    this.rem = 'none';

  }

  Save(){

    alert('Slot Selected');

    location.reload();
  }


  // remove(id:any){

  //   this.oldID = [...this.oldID,id] 

  //   sessionStorage.setItem("id's", JSON.stringify(this.oldID))
  // }

  // addSession(){

  //   sessionStorage.setItem('Announcements',JSON.stringify(this.announce));
  
  // }
  chatbotResponses = [
    { question: 'What is your name?', answer: 'My name is Chatbot.' },
    { question: 'What time is it?', answer: `It's currently ${new Date().toLocaleTimeString()}.` },
    { question: 'Is there any other interview slot available?', answer: 'Sorry, at this point of time we do not have any interview slots available' },
    { question: 'Hello', answer: 'Hi, how may i help you today?!'},
    { question: 'Hi', answer: 'Hi, how may i help you today?!'},
    {question : 'Where do you work?', answer :'I work at Persistent Systems.'}
  ];
  
  showChat: boolean = false;
  currentMessage: string = '';
  isSending: boolean = false;
  messages: Message[] = [];
  
  sendMessage() {
    if (this.currentMessage.trim() === '') {
      return;
    }
  
    const message: Message = {
      content: this.currentMessage,
      isSentByUser: true
    };
  
    this.messages.push(message);
    this.currentMessage = '';
    this.isSending = true;
  
    // Simulate bot response after 1 second
    setTimeout(() => {
      const responseText = this.getResponse(message.content);
      const response: Message = {
        content: responseText,
        isSentByUser: false
      };
  
      this.messages.push(response);
      this.isSending = false;
    }, 1000);
  }
  
  getResponse(userMessage: string): string {
    const response = this.chatbotResponses.find(item => item.question.toLowerCase() === userMessage.toLowerCase());
    return response ? response.answer : 'I did not understand your question.';
  }




}



