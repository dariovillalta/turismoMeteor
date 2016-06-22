import { Router } from "meteor/iron:router"
import "../ui/layout/layout.js"
import "../ui/homeMap/homeMap.js"
import "../ui/navBar/navBar.js"
import "../ui/placesEdit/placesEdit.js"
import "../ui/placesAdd/placesAdd.js"
import "../ui/usersEdit/usersEdit.js"
//import "../ui/departmentMap/departmentMap.js"

Router.configure({
    layoutTemplate:"layout"
});

Router.route('/',function(){
    this.render("homeMap");
});

Router.route('/departamento',function(){
    this.render("departmentMap");
});

Router.route('/placesEdit',function(){
    this.render("placesEdit");
});

Router.route('/placesAdd',function(){
    this.render("placesAdd");
});

Router.route('/usersEdit',function(){
    this.render("usersEdit");
});