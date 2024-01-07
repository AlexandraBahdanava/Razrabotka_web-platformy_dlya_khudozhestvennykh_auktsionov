const { Portfolio } = require("../database/models");
const bcrypt = require("bcrypt")

class PortfolioController {
async  addToPortfolio(req, res) {
    try {
        const portfolio = { ...req.body };

      const artistId = req.artistId;
      console.log(artistId);
      console.log("как упоительны в россии вечера",portfolio);

        const createdPortfolio = await Portfolio.create(portfolio);

        await createdPortfolio.setArtist(artistId);

        return res.status(201).json(createdPortfolio);
    } catch (err) {
        return res.sendStatus(500);
    }
}

async  getPortfolioById(req, res) {
    const id = req.artistId;

    if (!/^\d+$/.test(id)) {
      console.log(req.params);
      return res.sendStatus(400);
  }
    try {
        const photo = await Portfolio.findAll({
            where: { artistId: id },
        });
  
        if (artist == null) {
            return res.sendStatus(404);
        }
  
        return res.json(photo);
    } catch (err) {
        return res.sendStatus(500);
    }
}
}
module.exports = new PortfolioController();