package me.todoapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteToFrontEndController {

        @RequestMapping(value = "/")
        public String getIndex() {
            return "index.html";
        }

    @RequestMapping(value = "/not-signed-in")
    public String goToIndex() {
        return "redirect:/";
    }

}
