

export class MessageService{

message : string;
messageType : string;

success(data){
    this.message = data;
    this.messageType = "success";
}

error(data){
    this.message = data;
    this.messageType = "danger";
}

warning(data){
    this.message = data;
    this.messageType = "warning";
}



}