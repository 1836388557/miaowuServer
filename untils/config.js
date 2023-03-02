
var Head ={
  baseUrl:'http://192.168.6.132:3000/upload/',
  // baseUrl:'http://localhost:3000/upload/',
  _filename:'',
  get filename(){
    return this._filename
  },
  set filename(val){
    this._filename=val
  }
}
module.exports = {
  Head
}