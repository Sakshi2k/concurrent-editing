# CRDT-tutorial

![](https://miro.medium.com/max/875/1*4Eokr32mwX3IUzwEPDe0MQ.png)

Many of us have come across a range of real-time collaborative apps that helps teammates to work simultaneously on the same document or project. Apps such as Google Docs or Spreadsheets allow users to edit documents simultaneously. But what happens when we give our users the ability to edit the same document simultaneously?

Users end up overwriting each other's data. So if we dig more behind the working of these real-time collaborative apps, we will come across terms such as OT (Operational Transformation) and CRDT (Conflict-free Replicated Data Type). Now some of you may wonder what actually these terms signify. Followed by which one of these should we use for building real-time collaborative apps. 

#### OT 
  OT relies on an active server connection to coordinate and guarantee all clients operate correctly.

#### CRDT
  CRDT is capable of working peer-to-peer with end-to-end encryption. It only needs to coordinate connections between clients, even if a server is used. CRDT is resilient to      transient network connections. It even works if the clients go offline for a while, make changes, and synchronize when the network returns. 

For knowing more about OT (Operational Transformation) and CRDT (Conflict-free Replicated Data Type) refer to [this link](https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/#:~:text=OT%20trades%20complexity%20for%20the,even%20valid%20for%20your%20schema.).

Collaborative apps can cause divergence if there is no synchronization between the clients while editing text. This can lead to a whole lot of conflicts in the final data. We will be going with CRDT to avoid these kinds of issues. 

There are many types of CRDTs. Refer to [this link](https://github.com/pfrazee/crdt_notes/tree/68c5fe81ade109446a9f4c24e03290ec5493031f#portfolio-of-basic-crdts) for a good overview of the types of CRDT. Currently, there are many CRDT frameworks implemented.

Further Reading: [How to build a real-time collaborative app using CRDT in angular?](https://medium.com/blocksurvey/tutorial-how-to-build-a-real-time-collaborative-app-using-crdt-in-angular-44098525d5b)

## Note: 
In this tutorial, we will be using the Yjs NPM module as the CRDT framework. Users can implement their own design for the text editor. We are using Angular in this tutorial to implement the same.

### Technologies used :
#### Yjs
Yjs is a CRDT implementation that exposes its internal data structure as shared types. Shared types are common data types like Map or Array with superpowers: changes are automatically distributed to other peers and merged without merge conflicts.

#### y-websocket 
The Websocket Provider implements a classical client server model. Clients connect to a single endpoint over Websocket. The server distributes awareness information and document updates among clients

#### CodeMirror
CodeMirror is a code-editor component that can be embedded in Web pages. The core library provides only the editor component, no accompanying buttons, auto-completion, or other IDE functionality. It does provide a rich API on top of which such functionality can be straightforwardly implemented. 



### Real-time Collaborative Text Editor using CRDT

![](https://miro.medium.com/max/1250/1*G1CMih0JRaD5cVgd-2S3kA.gif)

### Real-time Collaborative Text Editor with websocket connection using Yjs NPM module

![](https://miro.medium.com/max/1250/1*0YdDkswFLDwtPWStoXAe7A.gif)

### Real-time Collaborative Todo App using CRDT

![](https://miro.medium.com/max/1250/1*RikSPbWYG5p30gZomfkjdA.gif)


## Summary

Using the CRDT algorithm different users can easily collaborate in a real-time text editor or todo app to jot down their notes. This, in turn, helps the users to create notes easily and also prevents from generating inconsistent data while users come back online. 

## References

[CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)

[Yjs NPM](https://www.npmjs.com/package/yjs)

[Real-time-Collaboration - OT vs CRDT](https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/#:~:text=OT%20trades%20complexity%20for%20the,even%20valid%20for%20your%20schema.)

[CRDT Libraries](https://crdt.tech/implementations)

[Figma Multiplayer Technology using CRDT](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)


## About Blocksurvey

BlockSurvey is a privacy-focused platform to create surveys, polls, & forms with complete confidentiality. Through BlockSurvey, all your data is encrypted end to end and only you can see it. You own your data. It’s your digital right. There are zero trackers and we keep you as anonymous to the data collectors. Our platform utilizes Blockstack and helps in maintaining privacy and anonymity, resulting in effective surveys and polls. Try out by creating your surveys and polls with us.

