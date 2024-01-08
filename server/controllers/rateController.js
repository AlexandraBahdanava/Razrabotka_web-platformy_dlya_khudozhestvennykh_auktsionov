const { Rate, Collector }= require("../database/models");


class rateController {

    async  getRatesByAuction(req,res) {
        const id = req.params.id;

        if (!/^\d+$/.test(id)) {
          console.log(req.params);
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