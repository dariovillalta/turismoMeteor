import "./navBar.html";

Template.navBar.rendered = function() {
	$('#divLogIn').hide();
  $(".button-collapse").sideNav();
  //$('.modal-trigger').leanModal();

	$('#loginTab').click(function(){
		$('#divResgister').fadeOut("quick");
		$('#divLogIn').fadeIn("quick");
		$('#divResgister').hide();
		$('#divLogIn').show();
	});
	$('#registrar').click(function(){
		$('#divLogIn').fadeOut("quick");
		$('#divResgister').fadeIn("quick");
		$('#divLogIn').hide();
		$('#divResgister').show();
	});
};

Template.navBar.events({
  "click #registrarBoton"(event){
      var User = {
        username: $("#usernameInput").val(),
        email: $("#emailInput").val(),
        password: $("#passwordInput").val(),
        roles: []
      }
      Accounts.createUser(User, function(err){
        if(err){
          Materialize.toast('User already exists', 4000);
        }else{
          Materialize.toast('Registrado Correctamente', 4000);
          console.log(User);
          Router.go('/');
        }
      });
  },
  "click .modal-trigger"(event){
    $('#modalLogIn').openModal();
  },
  "click #login"(event){
    Meteor.loginWithPassword($("#usernameInputLogin").val(), $("#passwordInputLogin").val(), function(error){
      if(error){
        Materialize.toast("El correo electrónico y/o contraseña que has introducido son incorrectos." + error, 4000);
      }else{
        Materialize.toast("Login Successfully", 4000);
        Router.go('/');
      }
    });
  }
});

Template.navBar.events({
  'click #logout'(event){
    Meteor.logout();
    Router.go('/');
  }
});