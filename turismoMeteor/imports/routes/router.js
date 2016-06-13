import { Router } from "meteor/iron:router"
import "../ui/layout/layout.js"
import "../ui/homeMap/homeMap.js"

Router.configure({
    layoutTemplate:"layout"
});

Router.route('/',function(){
    this.render("homeMap");
});