const { Rate, Collector }= require("../database/models");


class rateController {
  async create(req, res) {
    try {
        const rate = { ...req.body };

      const collectorId = req.params.id;
      console.log(collectorId);
      console.log(req.body);

        
        const createdRate = await Auction.create(rate);

        await createdRate.setCollector(collectorId);

        return res.status(201).json(createdRate);
    } catch (err) {
        return res.sendStatus(500);
    }
}

    async  getRatesByAuction(req,res) {
        const id = req.params.id;

        if (!/^\d+$/.test(id)) {
        //  console.log(req.params);
          return res.sendStatus(400);
      }
            try {
              const rates = await Rate.findAll({
                where: { AuctionId: id },
                include: [
                  {
                    model: Collector,      
                  },
               
              ]
    
              });
              
              return res.json(rates);
            } catch (error) {
              console.error('Error retrieving rates by artist:', error);
              throw error;
            }
          }
        }
module.exports = new rateController();  