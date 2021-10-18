import { Component, OnInit } from "@angular/core";
import { fromEvent, Observable, Subject } from "rxjs";
// CRDT Aglorithm
import * as Y from "yjs";
// Code editor
import CodeMirror from "codemirror";
// Web socket Provider
import { WebsocketProvider } from "y-websocket";
// y-codemirror binds yjs with codemirror
import { CodemirrorBinding } from "y-codemirror";

@Component({
  selector: "app-yjs",
  templateUrl: "./yjs.component.html",
  styleUrls: ["./yjs.component.scss"],
})
export class YjsComponent implements OnInit{

  // New Doc initialised
  ydoc = new Y.Doc();
  // Observable for cursor location detection
  clickObservable: Observable<Event> = fromEvent(window,'click');
  // Current status of user - connected or disconnected (opposite of textContent)
  textContent = "Disconnect";

  private eventSubject$ = new Subject<any>();

  // Websocket Provider
  provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "codemirror-large",
    this.ydoc
  );

  // provider.on('sync', function(isSynced: boolean))

  // Current User Data
  user = {
    userName :"Sakshi",
    cursorLocation : { xLocation : 0, yLocation :0 },
    color : {
      color:"", light:""
    }
  }

  constructor() {
    this.createEditor();
    
    // Setting colour for each specific user
    this.user.color = this.generateColor();
    
    const loc = {
      xLocation : 0,
      yLocation : 0
    }

    this.updateWebSocketProvider();
  }

  ngOnInit(): void {
    this.subscribeToObservable();
    // this.provider.on('sync', function(isSynced: boolean){
    //   console.log("Synicng data recieved from server");
    // });
  }

  // To get user's cursor location  
  // not working correctly
  private subscribeToObservable() {
    // this.edito
    
    this.clickObservable.subscribe(() => { 
      var loc = {
        xLocation: 0, yLocation :0
      }
      window.addEventListener("click", function(event) {
        loc = {
          xLocation : event.pageX,
          yLocation : event.pageY
        }
        console.log(event.pageX,event.pageY);
      });
      this.user.cursorLocation = loc;
    })
  }

  // Function for making connection between users.
  connect() {
    if (this.provider.shouldConnect) {
      this.provider.disconnect();
      this.textContent = "Connect";
    } else {
      this.provider.connect();
      this.textContent = "Disconnect";
    }
    console.log(this.textContent + "ing");
  }

  createEditor() {
    // Using Codemirror package from YJS for building connection between users
    // Codemirror Code for setting up Textarea field for entering data
    const yText = this.ydoc.getText("codemirror");
    const editorContainer = document.createElement("div");
    editorContainer.setAttribute("id", "editor");
    document.body.insertBefore(editorContainer, null);

    // Code for adding line numbers to the text editor.
    const editor = CodeMirror(editorContainer, {
      mode: "javascript",
      lineNumbers: true,
      user: this.user,
    });
    editor.focus();
    editor.setCursor(editor.lineCount()+4, 0)

    const binding = new CodemirrorBinding(yText, editor, this.provider.awareness);

    const provider = this.provider;
    const ydoc = this.ydoc;

    // @ts-ignore
    window.example = { provider, ydoc, yText, binding, Y };
    console.log(editor);
  }

  updateWebSocketProvider() {
    // Setting user details to web socket provider.
    this.provider.awareness.setLocalStateField('user', {
      name: this.user.userName,
      color: this.user.color.color,
      colorLight: this.user.color.light,
      location: this.user.cursorLocation
    });
    console.log("this.provider");
    console.log(this.provider);
  } 

  generateColor() {
    const usercolors = [
      { color: '#30bced', light: '#30bced33' },
      { color: '#6eeb83', light: '#6eeb8333' },
      { color: '#ffbc42', light: '#ffbc4233' },
      { color: '#ecd444', light: '#ecd44433' },
      { color: '#ee6352', light: '#ee635233' },
      { color: '#9ac2c9', light: '#9ac2c933' },
      { color: '#8acb88', light: '#8acb8833' },
      { color: '#1be7ff', light: '#1be7ff33' }
    ];

    const selectedColor = usercolors[Math.ceil(Math.random()*10) % usercolors.length];
    return selectedColor;
  }

  updateUserName(event) {
    this.user.userName = event.target.value;
    this.updateWebSocketProvider();
  }
}
