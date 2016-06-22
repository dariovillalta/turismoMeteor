import "./navBar.html";

Template.navBar.rendered = function() {
	$('#divLogIn').hide();
	$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

	$('#login').click(function(){
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
      var Profile = {
        firstname: $("#firstnameInput").val(),
        lastname: $("#lastnameInput").val()
      }
      var User = {
        username: $("#emailInput").val(),
        email: $("#emailInput").val(),
        password: $("#passwordInput").val(),
        profile: Profile
      }
      Accounts.createUser(User, function(err){
        if(err){
          Materialize.toast('User already exists', 4000);
        }else{
          Materialize.toast('Registrado Correctamente', 4000);
          Router.go('/');
        }
      });
  }
});