# final-project-fatal-shooting-by-us-police
Policing is a difficult job, but it also something that provides too much power into the hands of a few individuals, and it becomes difficult to hold people with authority accountable for their actions. According to the Washington Post, Police officers in the U.S. shoot and kill about 1,000 people each year.

Are all kinds of crimes worthy of a direct final judgment without a trial in the court of law? This is a difficult question to answer. But while people are thinking, we would like to provide them with an interactive way to explore the around 1,000 deaths by police each year. Based on the goal above, we use a dataset compiled by The Washington Post of every fatal shooting in the United States by police since 2015. 
To analyze the racial disparity in police shootings, we chose three races, black, white, and Hispanic as research targets, and explored the data via temporal and geographic distribution.

A grid map is designed to show the Police-caused death per one million citizens in each state. The color and size of circles are corresponding to the number of death ratio. The year slider below demonstrates the dynamic change by year. The detailed information of ratio by race is broken down to the line chart on the right. By clicking the state, users can view the state’s death ratio of three races and compare it with the national death ratio. Labels at the end of each line provide the information of state and race. Filter function is added on the top, so users could focus on the data of specific race. 
They can also acquire the specific values by hovering on the line chart. The chart on this page is focusing on the geographic distribution of death ratio, how about an overview of rate distribution by race?

The chart below gives users a clear sense of the ratio distribution by race. The box plot shows the overall distribution while the dots give the specific information. The death ratio gets higher along the x-axis. Year slider is added as well. One circle represents one state. Its size shows the death number.  A highlight function is added on states to give users a better sense of how different the death ratio is by three races in one state. Search function and animation by year will be added later.

# Acknowledgement
Data Source:
* [Data Police shootings](https://www.kaggle.com/mrmorj/data-police-shootings) and [Police Violence & Racial Equity Dataset](https://www.kaggle.com/jpmiller/police-violence-in-the-us) retrieved from Kaggle, which is derived from database of every fatal shooting in the United States by a police officer. 

Analysis:
* [Understanding the Extent of Police Abuse in the United States of America](https://www.kaggle.com/thedatabeast/understanding-the-extent-of-police-abuse-in-the-us?select=deaths_arrests_race.csv)

JS: 
* [Scroller](https://vallandingham.me/scroller.html)
* [Scroller](https://medium.com/@bryony_17728/titanic-d3-scrolling-story-eaed1b6f5766)
* [AOS](https://github.com/michalsnik/aos)
* [Nav Bar](https://codyhouse.co/gem/vertical-fixed-navigation-2)
* [Choropleth Map: US States](https://d3-geomap.github.io/map/choropleth/us-states/)
