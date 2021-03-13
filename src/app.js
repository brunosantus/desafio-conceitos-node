const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const projet = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };

  repositories.push(projet);

  return response.json(projet);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'});
  };

  const { likes } = repositories[projectIndex];

  const project = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[projectIndex] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found.'})
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error:'Project not found.'});
  }

  const {title, url, techs, likes} = repositories[projectIndex];

  let like = likes + 1;

  const project = {
    id,
    title,
    url,
    techs,
    "likes" : like,
  }

  repositories[projectIndex] = project;

  return response.json(project); 
});

module.exports = app;
