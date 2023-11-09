import express from 'express';
import fs from 'fs';
import path from 'path';





export const getPhotoList = (req, res) => {
    const subfolder = req.params.subfolder;
    const imageDir = path.join('public/images', subfolder);
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error('Erreur de lecture du répertoire imageDir : ', err);
      res.status(500).json({ error: 'Erreur de lecture du répertoire' });
    } else {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const imageList = files.filter((file) =>
        imageExtensions.some((ext) => file.endsWith(ext))
      );

      res.json(imageList);
    }
  });
}
