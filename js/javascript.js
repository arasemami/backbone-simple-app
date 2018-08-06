// Backbone Model

var Blog = Backbone.Model.extend({
    defaults:{
        author:'',
        title:'',
        url:''
    },
});


// Backbone Collaction

var Blogs = Backbone.Collection.extend({});



// // Instantiate two blos

// var blog1 = new Blog({
//     author:'aras',
//     title:'aras hast khali khob',
//     url:'www.aras.com'

// });

// var blog2 = new Blog({
//     author:'omid',
//     title:'omid hast khali khob',
//     url:'www.omid.com'

// });


// Instantiate Collection

var blogs = new Blogs();



// Backbone Views for one Blog


var BlogView = Backbone.View.extend({

    model: new Blog(),
    tagName:'tr',
    initialize: function(){
        this.template  = _.template($('.blogs-list-template').html());
    },
    // creeat events for our table like edit , update , delete and cancel
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog':'update',
        'click .cancel':'cancel',
        'click .delete-blog': 'delete'
    },
    // Follow our event like as funcation now ---->
    edit: function(){

        // Make control button after click edit button show update and visiblae pas button --->
        
        $('.edit-blog').hide();
        $('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        // Get data from table and put in variable --->

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        // Creat new filed for update input  --->

        this.$('.author').html('<input  type="text" class="form-control author-update" value="' + author + '">')
        this.$('.title').html('<input  type="text" class="form-control title-update" value="' + title + '">')
        this.$('.url').html('<input  type="text" class="form-control url-update" value="' + url + '">')
    },
    update:function() {
       
        this.model.set('author', $('.author-update').val());
        this.model.set('title', $('.title-update').val());
        this.model.set('url', $('.url-update').val());
    },
    cancel:function(){
        blogsView.render();
    },
    delete:function(){
       
        // Show aler with sweet alert -->

        swal({
            title: "Are you sure?",
            text: "Do you want to delete this record?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              this.model.destroy();
            } else {
              swal("Your imaginary file is safe!");
              
            }
          });

       
    },
    render: function(){
        this.$el.html(this.template( this.model.toJSON()));
        
        return this;
    }
});



 

// Backbone View All Blogs

 var BlogsView = Backbone.View.extend({

     model: blogs,
     el: $('.blogs-list'),
     initialize: function() {
         var self= this;
         this.model.on('add',this.render, this );
         this.model.on('change', function(){
            setTimeout(function(){
                self.render();
            },30 );
         } ,this);
         this.model.on('remove', this.render, this);

     },
     render: function(){
         var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog){
            self.$el.append((new BlogView({model: blog})).render().$el);
        });
       
        return this;
     }

 });

 var blogsView = new BlogsView();

 $(document).ready(function(){
    $('.add-blog').on('click', function(){
        
         if($('.author-input').val() == ''){
            swal("The all fild is requirement!");
            swal("The requirement Fild", "Please fill any input");

         }
         else{
       
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()

        });
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');

       // console.log(blog.toJSON());
        blogs.add(blog);
    }
    })
 });





 var User = Backbone.Model.extend();



 var Users = Backbone.Collection.extend({
        model: User,
        url:'https://jsonplaceholder.typicode.com/users'
 });

 var tableUser = Backbone.View.extend({
     el: $('#wrapper'),
     initialize: function(){
         this.render()
     },
     render: function(){
         var self = this;
         var users = new Users();
         users.fetch({
             success:function(users){
                var variable = { users:users.models }
                var template = _.template($('#table_template').html())
                self.$el.html(template(variable))
             }
         })
     }
 });
 
 new tableUser();

