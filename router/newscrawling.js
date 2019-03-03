const HeraldCrawler = require('./../crawlers/herald-crawler');
const JoongangCrawler = require('./../crawlers/joongang-crawler');
// const MkCrawler = require('./../crawlers/mk-crawler');
const ReutersCrawler = require('./../crawlers/reuters-crawler');


/* Router */
module.exports = function (app) {
    const newsNames = ['herald', 'joongang', 'mk', 'reuters'];
    const newsCrawlers = {
        'herald': (newsCategory, newsDivision, startDate, endDate) => { return new HeraldCrawler(newsCategory, newsDivision, startDate, endDate); },
        'joongang': (newsCategory, newsDivision, startDate, endDate) => { return new JoongangCrawler(newsCategory, newsDivision, startDate, endDate); },
        //'mk': (newsCategory, newsDivision, startDate, endDate) => { return new MkCrawler(newsCategory, newsDivision, startDate, endDate); },
        'reuters': (newsCategory, newsDivision, startDate, endDate) => { return new ReutersCrawler(newsCategory, newsDivision, startDate, endDate); }
    };

    for (let i = 0; i < newsNames.length; i++) {
        app.get(`/newscrawling/${newsNames[i]}`, function (req, res) {
            console.log(req.route.path);
            newsCategory = req.query.newsCategory;
            newsDivision = req.query.newsDivision;
            startDate = req.query.startDate;
            endDate = req.query.endDate;

            // response immediately
            res.status(200).end();

            newsCrawlers[newsNames[i]](newsCategory, newsDivision, startDate, endDate)
                .updateCrawling(function(err) {
                    if (err) {
                        console.log('crawling stopped');
                    } else {
                        console.log('crawling done');
                    }
                });
        });
    }
}
