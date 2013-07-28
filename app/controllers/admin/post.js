define(['gnd',
        'models/post'], 
function(Gnd,Post){
  return function(pool){
    this.render('views/admin/posts.html',function(){
      //TODO: use jquery validate plugin
      $('#form-post').on('submit',function(form){
        var postData = {
          title:$('#exampleInputTitle').val(),
          content:$('#exampleInputContent').val()
        }
        var post = Post.create(postData);
        post.save();
        return false;
      })
    })
  }
})