define(['gnd',
        'models/post'], 
function(Gnd,Post){
  return function(pool){
    this.render('views/main.html',function(){
      var posts = Post.all();
      var postVM = new Gnd.ViewModel(Gnd.$('#main-post-section')[0],{posts:posts});
    })
  }
})