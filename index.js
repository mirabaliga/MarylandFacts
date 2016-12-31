'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.032b771e-1dec-436d-aa83-82fefc78f59d"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";s
var SKILL_NAME = 'Maryland Facts';

/**
 * Array containing Maryland facts.
 */
var MARYLAND_FACTS = [
    "The United States Naval Academy was founded on October 10, 1845 at Annapolis.",
    "In 1830 the Baltimore & Ohio Railroad Company built the first railroad station in Baltimore.",
    "During revolutionary times Rockville was known as Hungerford's Tavern the name of its most familiar landmark. One of the first calls to freedom from British rule was heard at the tavern in 1774.",
    "The Basilica of the Assumption of the Blessed Virgin Mary is considered a masterpiece and one of the finest 19th century buildings in the world. The basilica is the first cathedral in the United States. Baltimore represents the first Roman Catholic diocese.",
    "Fort Meade near Laurel became a base because a train engineer delivering soldiers to Meade knew only one Meade, the one in Maryland. He was not aware of Fort Meade, Florida. The confusion happened so often a second base was built in Maryland in an attempt to avoid the confusion.",
    "King Williams School opened in 1696 it was the first school in the United States.",
    "The first dental school in the United States opened at the University of Maryland.",
    "Babe Ruth, the Sultan of Swat, was born in Baltimore and attended Saint Mary's Industrial School.",
    "Other Major League Ball player besides The Babe born in Maryland include Cal Ripken, Jr., Billy Ripken, Lefty Grove, Frank (Home Run) Baker, Harold Baines, Al Kaline, Denny Neagle, and Jimmie Foxx.",
    "Tilghman Island is home to the Skipjacks, the only commercial sailing fleet in North America.",
    "America's national anthem was written by Francis Scott Key a Maryland lawyer. It is believed Key wrote the anthem on September 14, 1814 while watching the bombardment of Fort McHenry in Baltimore Harbor.",
    "Since May 30th, 1949 the United States flag has flown continuously over the monument marking the site of Francis Scott Key's birthplace. The flag flies at Terra Rubra Farm, Carroll County, Keymar, Maryland as mandated by a Joint Resolution of Congress.",
    "The National Aquarium is located in Baltimore's Inner Harbor.",
    "The 1,200 foot Francis Scott Key Bridge in Baltimore is the second longest continuous truss bridge in the nation.",
    "The 4.03 mile William Preston Lane Memorial (The Bay Bridge), joins the western part of Maryland to the eastern shore and crosses the Chesapeake Bay.",
    "Annapolis is known as the sailing capital of the world.",
    "Located in the Chesapeake Bay, Smith Island is Marylands only inhabited off-shore island.",
    "The highest point in Maryland is 3,360 feet above sea level on Backbone Mountain in Garrett County. The absolute lowest point in Maryland is a depression, often called Bloody Point Hole, 174 feet below sea level. The area is located approximately 1 mile west-southwest of the southern tip of Kent Island in Queen Anne's County.",
    "The Maryland State House is the oldest state capitol still in continuous legislative use.",
    "Chincoteagues are famous ponies from Assateague Island.",
    "Dredging and tonging are methods for harvesting oysters.",
    "On June 24,1784, in Baltimore, 13-year old Edward Warren went airborne in the first successful manned balloon launch in the United States.",
    "Maryland forests cover approximately 2.7 million acres, or 43% of the states land surface. Oak and hickory are the dominant hardwood or deciduous forest type, making up 60% of forested areas. Loblolly pine is the most prevalent softwood and is the predominant forest wood on the Eastern Shore.",
    "Constructed circa 1850 an acorn-shaped gazebo can be found in Acorn Park in Silver Spring. The park is all that remains of Francis Preston Blair's estate.",
    "On September 14, 1975, Elizabeth Ann Bayley Seton of Emmitsburg was canonized, becoming the first native-born American to be so honored. Saint Elizabeth Ann formed the religious community the Sisters of Charity.",
    "The National Institute of Standards and Technology gave Gaithersburg the designation Science Capital of the United States when the Bureau moved to the area in 1961.",
    "Samuel F.B. Morse reportedly received the first telegraph message in Bladensburg, in 1844, before his famous 'What Hath God Wrought' message between Baltimore and Washington. His telegraph wire had been strung along the railroad right of way. Ezra Cornell, founder of Cornell University, lived in Bladensburg and is said to have invented the telegraph pole.",
    "The town of Garrett Park declared the first nuclear free zone in the United States in 1982, thus affirming a tradition of peacefulness that began back in 1898 when it became illegal to harm any tree or songbird within the town limits.",
    "Maryland was first to enact Workmen's compensation laws in 1902.",
    "Friendship International Airport - now Baltimore/Washington International Airport - began operations on June 24. 1950.",
    "Channel 67 broadcast the state's first public television programs on October 5, 1969.",
    "Greenbelt was the first community in the United States built as a planned city. Greenbelt was an experiment in both the physical and social planning.",
    "The Concord Point Lighthouse in Havre de Grace is the oldest continuously operated lighthouse in the State of Maryland.",
    "Havre de Grace is known as the decoy capitol of the world.",
    "The Methodist Church of America was formally organized in 1784 at Perry Hall.",
    "Mount Airy is unique because two counties, Carroll and Frederick, divide it.",
    "Oxford (founded 1683), gained its prominence in colonial days by being mandated in 1694 by Maryland legislation as the first and only port of entry on the eastern shore.",
    "On the morning of August 10, 1813 residents of Saint Michaels having been forewarned of a British attack hoisted lanterns to the masts of ships and in the tops of the trees. The height of light caused cannons to overshoot the town. This first known blackout was effective and only one house was struck and is now known as the Cannonball House. The town has been known as the town that fooled the British since this historic event.",
    "New Market is known as Maryland's antique capital.",
    "Swallow Falls State Park near Oakland showcases Muddy Creek Falls. At 63 feet it is the largest waterfall in Maryland.",
    "Maryland gave up some of its land to form Washington D.C.",
    "The Maryland Renaissance Festival is held from August and October in Crownsville.",
    "Maryland is a prominent producer and processor of seafood and a national leader in the production of blue crabs and soft clams.",
    "The Thrasher Carriage Museum in Frostburg houses a collection of early 19th- and 20th-century horse drawn conveyances. Formal closed carriages, milk wagons, open sleighs, funeral wagons, dog carts, and President Roosevelt's inaugural carriage are among the approximately 50 vehicles featured.",
    "Sixteen of the 23 Maryland counties border on tidal water. The combined length of tidal shoreline, including islands, is 4,431 miles.",
    "The Bollman Truss Railroad Bridge in Savage is made of both cast iron and wrought iron. It is the only open railroad bridge of its type anywhere in the world.",
    "Clara Barton National Historic Site commemorates the life of Clara Barton, founder of the American Red Cross. The house in Glen Echo served as her home and headquarters for the American Red Cross and a warehouse for disaster relief supplies.",
    "Maryland has forty-seven operational State parks, including 7 parks with waterfront areas, covering 90,239 acres; 15 State-owned lakes and ponds open to public fishing; 9 State forests and portions of 15 State parks open to public hunting; 36 wildlife management areas, covering 88,348 acres, open to public hunting; 6 natural environment areas containing 7,676 acres.",
    "Annapolis was known as the Athens of America during the seventeenth century and once served as the capital of the United States.",
    "The Community Bridge mural project in Frederick transformed a plain concrete bridge into the stunning illusion of an old stone bridge. The entire structure was painted by hand by an artist and his assistants, using advanced trompe l'oeil (deceive the eye) techniques."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random Maryland fact from the Maryland facts list
        var factIndex = Math.floor(Math.random() * MARYLAND_FACTS.length);
        var randomFact = MARYLAND_FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a Maryland fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};