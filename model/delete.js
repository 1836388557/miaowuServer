var fs = require("fs");
deleteFolderRecursive = function(path) {
  console.log("删除文件操作")
  //判断给定的路径是否存在
  fs.exists(path,function(res){
    if(res){
      fs.unlink(path,function(){
        console.log('删除成功')
      });
    }else{
      console.log("给定的路径不存在，请给出正确的路径");
    }
  })

};
module.exports = {
  deleteFolderRecursive
}