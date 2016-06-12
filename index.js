"use strict";

var Promise = require('bluebird');

var Nightmare = require('nightmare');

var signinFormSelector = 'form[action*="/users/sign_in"]';
var signinFormEmailInputSelector= `${signinFormSelector} [name="user[email]"]`;
var signinFormPasswordInputSelector= `${signinFormSelector} [name="user[password]"]`;
var signinFormSubmitButtonSelector= `${signinFormSelector} [type="submit"]`;

class SemaphoreCi {
  constructor(config = {}) {
    this.config = {}
    this.config.email = config.email;
    this.config.password = config.password;
    this.config.show = config.show || false;
  }
  doesProjectExist(projectName) {
    console.log(`Verifying that project '${projectName}' exists...`)
    return new Promise((resolve, reject) => {
      if (!this.config.email && !this.config.password) {
        console.log("Must provide email and password")
        return;
      }
      var nightmare = Nightmare({ show: this.config.show})
      nightmare
        .goto('https://semaphoreci.com/users/sign_in')
        .cookies.clear("remember_user_token")
        .cookies.clear("_semaphoreappdotcom_session")
        .goto('https://google.com')
        .goto('https://semaphoreci.com/users/sign_in')
        .insert(signinFormEmailInputSelector, this.config.email)
        .insert(signinFormPasswordInputSelector, this.config.password)
        .click(signinFormSubmitButtonSelector)
        .wait('body#projects-index')
        .click("#new-project-button")
        .wait('a#refreshProjects')
        .click("a#refreshProjects")
        .wait(5000)
        .type('input#search_projects', projectName)
        .wait(1000)
        .evaluate(function () {
          return document.querySelectorAll('.repositoryList li:not([style="display: none;"]')[0].querySelectorAll(".repositoryName")[0].childNodes[0].nodeValue.trim()
        })
        .end()
        .then(function(firstProjectName){
          resolve(firstProjectName === projectName)
        })
        .catch(function (error) {
          reject(new Error('Nighmare failed:' + error));
        });
    })
  }

  createProject(projectName){
    console.log("Staring to create the project...")
    return new Promise((resolve, reject) => {
      if (!this.config.email && !this.config.password) {
        console.log("Must provide email and password")
        return;
      }
      this.doesProjectExist(projectName)
      .then((exists) => {
        if (!exists) {
          console.log('Project does not exist')
        }
        if (exists) {
          console.log(`Verified that project '${projectName}' does exist.`)
          var nightmare = Nightmare({ show: this.config.show})
          nightmare
            .goto('https://semaphoreci.com/users/sign_in')
            .cookies.clear("remember_user_token")
            .cookies.clear("_semaphoreappdotcom_session")
            .goto('https://google.com')
            .goto('https://semaphoreci.com/users/sign_in')
            .insert(signinFormEmailInputSelector, this.config.email)
            .insert(signinFormPasswordInputSelector, this.config.password)
            .click(signinFormSubmitButtonSelector)
            .wait('body#projects-index')
            .click("#new-project-button")
            .wait('a#refreshProjects')
            .click("a#refreshProjects")
            .wait(5000)
            .type('input#search_projects', projectName)
            .click(".repositoryList li:first-child a")
            .wait('a[data-branch-name="master"]')
            .click('a[data-branch-name="master"]')
            // TODO: Why isn't this working
            // .wait('a[data-owner-username="joegesualdo"]')
            .wait(3000)
            .click('a[data-owner-username="joegesualdo"]')
            .wait('body.analysisResults')
            .wait('select[name="language"]')
            .select('select[name="language"]', "object:57")
            .wait('select[name="language_version"]')
            .select('select[name="language_version"]', "string:6.1")
            .click('a[href$="/settings/collaborators/set_up"]')
            .wait(5000)
            .end()
            .then(function(v){
              resolve()
            })
            .catch(function (error) {
              reject('Nighmare failed:' + error)
            });
        }
      });
    });
  }
}

export default SemaphoreCi;
