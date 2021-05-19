# final-project-fatal-shooting-by-us-police

[Link to Website](https://6859-sp21.github.io/final-project-fatal-shooting-by-us-police/)

[Link to Video Teaser](https://www.youtube.com/watch?v=FX0CYhiVTME&feature=youtu.be)

[Link to Paper](https://drive.google.com/file/d/1kHmS7OeB1_yqae8iJnVJQ0yAZU1O5Zlr/view?usp=sharing)

<p align="center">
  <img alt="Front" src="https://6859-sp21.github.io/final-project-fatal-shooting-by-us-police/images/front.png" width="50%">
&nbsp; &nbsp;
  <img alt="Map" src="https://6859-sp21.github.io/final-project-fatal-shooting-by-us-police/images/map.png" width="50%">
</p>
<p align="center">
  <img alt="EDA" src="https://6859-sp21.github.io/final-project-fatal-shooting-by-us-police/images/EDA.png" width="50%">
&nbsp; &nbsp;
  <img alt="Race" src="https://6859-sp21.github.io/final-project-fatal-shooting-by-us-police/images/Race.png" width="50%">
</p>

# Development Process Overview
The main responsibility is divided as following, but everyone is responsible for crossing checking and updating each other's section when there are cross-references and interactions between different sections.
* Rui Wang: UI/UX Design, Grid Map and Line Chart for death rate by race, Bar Charts for armed status, Circle Chart Interaction, Matrix Chart, Page Navigation, Cover Page, End Page, Scroller Interaction
* Jiahui Tang: Calendar Heatmap Page, Geomap, Interaction between Gepmap and Matrix Chart, Sticky Sliding Bar and its Interactions, Interactive Timeline Page for Protests Progress
* Silin Zou: Boxplot, Scrolly-telling Page, EDA charts and analysis, and Interaction between EDA and Sliding Bar, Circle Chart and animations for Racial Disparity


# Introduction 
Policing is a challenging and respectable occupation, but it is also a position that may cast too much authority into the hands of a few individuals. The latest rise of protests against police violence is not appearing out of nowhere, but due to the unprecedented extent of police violence towards minority groups. Such brutality is and always has been woven into the daily life of American citizens. The United States has extremely high rates of homicide by police compared to other developed countries. It has at least three times the rate compared to Canada, a high-income country with the next highest rate of killing [1]. The majority of these police killings are fatal shootings, and 24% of those who get shot were black [2]. What is the situation in each state? To what extent does systemic racism exist in police shootings? Our project visualizes the approximate 1,000 annual fatal deaths caused by policing across the United States and explores the racial disparity issue underlying the data. 

We believe that each death is more than a statistical figure, it is a life that once lived in this world. In our visualization project, we managed to show the overall situation with ethical dimensions by combining big data of national killings with small data of each death. The color we choose for visualization is also aimed to convey ethical and human suffering behind the data. We wish our visualization not only reflects the fact of police shooting but also invokes reflections, thinking and raises awareness among audiences. Together, we hope that we could contribute our parts in ending police violence and advancing racial justice.


# Related Work
We reviewed numerous previous work and visualizations related to gun shooting, violence and racial equity topics. In terms of visualization work, the Gun Deaths In America [3] project in fivethirtyeight inspired us by its interactive chart and its exploration over more than 33,000 annual gun deaths in America and what it would take to bring that number down through a grid map. It represents individual death by a grid, and using storyline to compare between various level of death such as gun death, terrorism, suicide etc. We also referred to the post of police shooting on Washington Post [4], which gives a clear narrative and visualizations of current status of police shootings in the US. The Death Toll Of Police [5] by Leonardo Nicoletti gives detailed interactive geographical visualization, animated bubble chart and other line charts, scatter plot to visualize political indications between republican and democrat for death caused by policing in the United States across years. 
In terms of analysis work, we reviewed two pieces of analytics and comments, including Racial disparity in police shootings unchanged over 5 years [6] by Yale News, and Understanding the Extent of Police Abuse in the United States of America [7] from Kaggle post. Both of them gave us different perspectives into exploring racial disparity, police violence and fatal shootings. 


# Methods 
We divided our visualization website into two primary sections: the overall police fatal shooting and its racial disparity. The first section consists of five screens showing interactive visualizations regarding exploratory data analysis of police fatal shootings in the US across time and space. The data in this section comes primarily from the Data Police Shootings dataset maintained by Washington Post, which covers every fatal police shooting from all 50 states by a US police officer since Jan 1, 2015. To better display the police killing issue across time, a sticky slider bar is added on top of the screen that follows audiences when they navigate through these five pages. By sequence, the first section consists of preface, calendar map, matrix chart, geographical map and a scrolly-telling feature EDA across time.

The preface page explains the context of this topic and its significance for visualization. The calendar map shows the high frequency of police fatal shootings across time in different years. And the geographical map explores the same issue across space in different states. We believe that one death is not just a number, it's a life that once lived in this world. The importance of data for a killed citizen should not be diminished. Thus, a matrix chart where each dot represents one death is designed to show the personal information. There is a reciprocal interaction between the map and matrix chart. Once the mouse hovers over the dot of the matrix map, the shooting location on the map chart is highlighted; on the other hand, if we click the state in geomap, the corresponding dots in matrix map will also be highlighted to show how many person are killed by police on that year in the selected state. The feature EDA charts provide further analysis of the matrix chart in the form of scrollytelling.

The second section consists of the rest pages that conducted in-depth investigation into police violence, racial disparity and inequality problems. By sequence, it consists of a quote page, a grid map on death rate by races, a box-circle plot, bar plots on armed status by race, a timeline of racial protest, and an ending page. In this section, we used the Fatal Encounters dataset maintained by journalist and researcher D. Brian Burghart, which is widely considered the most comprehensive accounting of deadly police violence since 2008. Population totals (used to calculate death rates per one million people) are based on analysis of the Census Bureau’s American Community Survey (ACS). Population numbers are rounded to the nearest 100. For bar charts on death rate by races, all figures are averages from the years 2008 to 2019. For the racial disparity in police shootings, we choose three races, black, white, and Hispanic as research targets, and compare their death ratio. We also purposefully want to show how our current status in protesting against racial disparity and police violence, thus the timeline page shows black lives matters related events to record progressive actions towards racial disparity issues. 

We would also like to give the audience an overall sense of storytelling, thus we included several designs of cover page, preface quotations, intermediate quote, and ending slogan page with pictures to show our motivation and the story we would like to convey. It links together all the pages by vivid visual graphs and quotes, and greatly enhances the readability as well as raises audiences’ awareness of police violence and racial disparity. 

# Results
Our visualization produces 11 screens, including one cover page, two quotation pages, six visualization pages, one scroll-telling story, and an ending page. By browsing our web page from top to bottom, users can explore the fatal police shootings across the country, investigate how these shootings relate to racial inequality, and choose the problems they care about for exploration. We try our best to deliver neutral information by faithfully citing, processing, and visualizing the data so that users can form their own opinions and draw conclusions.

We showed our visualization to one user who is based in Massachusetts (MA) and interested in the police shootings in MA in recent years. He was shocked when looking at the preface page, knowing that about 1000 civilians are killed annually, and was attracted to learn more about the current status of police shootings. Then the calendar map appeared and revealed the severe and extensive phenomenon of fatal shootings by the police. The user also used the time slider to see the trend of shooting calendars. Scrolling down to the grid and geo maps, the user was able to click MA, which is the target state, to view general death information in different years. The interaction between grid map and geo map enables further exploration of people who passed away. The user said he could see not only the situation in MA but also the comparisons between MA and other states. The scrolly-telling story provides the user with detailed information about people killed by police shootings, including their age distribution and whether they were armed and fleeing when they got shot.

Continuing browsing on the webpage, the user examined the racial disparity in MA by clicking the MA state in the grid map. A line chart associated with MA is generated automatically showing the death rate by race in recent ten years. There is a selection button on the top of the line chart, by which the user can choose which race to compare and even show the national average. The time slider and the color encoding in the grid map also helps the user learn more about the inter-annual variation of the MA average death rate. The box-circle chart directly illustrates the death rate difference by race in different states. When hovering over the circle of MA, the user can target this state and observe the death rates by race and its transition by year. The following bar plot shows the nationwide racial issue explicitly. Moreover, the timeline page that records history protests complements the story about police violence and racial disparity. 

The user told us he enjoyed interacting with our visualizations. In addition to effectively addressing the problem of fatal police shootings in MA, our visualizations present comprehensive information across the country and various perspectives of police shooting and racial issues, which provide more possibilities for future exploration.

# Discussion 
The visualization aims to let users explore the gun death numbers annually across different states in the United States, look into racial disparity and police violence issues, in order to raise awareness in the general public. By directly looking into grid maps and individual points, we also hope to build this visualization in memory of individuals killed from police fatal shootings. 

To investigate what has the audience learned from our visualization work and what new insights or practices has our system enabled, we conducted the below simple user study and peer critique to evaluate our illustration. We sampled around 20 audiences including classmates and acquaintances in the developing phase of our product, and showed different visualization choices for them to request for peer critique and feedback, observe their browsing behaviour, conducted face to face interviews to ask for their comments. We iteratively improved our website to make our visualization purpose and goal more clear and straightforward. 

The audiences received our motivation well and enjoyed browsing through our website. The use of both the picto-graphs, grid map and geo map are seen to be extremely relevant to the data set and question we are tackling. The picto-graphs are especially said to be effective at adding a layer of personalization to visualization by representing each individual using a dot. Audiences liked the clean design and use of colors for both the visualizations and pages, and the use of fonts were also deemed effective in contextualizing our visualizations. They also especially liked the strolly-telling part to reveal the EDA part of the dataset by a storyline. They are happy with hovering around dot and map to view more details in tooltip and explore information through visual encoding, interaction and animations and design qualities. 

# Future Work

In terms of visualizations, the following features can be further refined. First, the calendar map shows the national shootings currently. It might be helpful to provide state-wise information, even city shootings, which the audience may be interested in. Second, for the geo map, it is challenging to choose the color for different states indicating deaths since there are so many states that it is hard to use color to differentiate the death number in each state. In addition, the circles in the box-circle chart may overlap since we intentionally incorporate the population into our visualization. It would be beneficial if we could resize the x-axis and accommodate all these circles without overlap. 

We believe it would be interesting to examine the progress over the years. According to a new report by scientists at Yale and the University of Pennsylvania [6], the racial disparity in police shootings remains unchanged in recent five years. Our visualization also shows an increasing trend of police shootings. By looking into the actions we have made and the remaining problems, we could try to find a way to end police violence and advance racial justice.

We think our work could be extended to visualize general violence and racial inequality problems besides policing. Also, it is a systematic visualization that can be transferred to other countries directly.  


# Reference
[1] D. Hemenway, D. Azrael, A. Conner, and M. Miller, “Variation in Rates of Fatal Police Shootings across US States: the Role of Firearm Availability,” J. Urban Health, vol. 96, no. 1, pp. 63–73, Feb. 2019, doi: 10.1007/s11524-018-0313-z.

[2] “The Other Epidemic: Fatal Police Shootings in the Time of COVID-19,” American Civil Liberties Union.https://www.aclu.org/report/other-epidemic-fatal-police-shootings-time-covid-19 (accessed May 18, 2021).

[3] Casselman, B., Conlen, M., & Fischer-Baum, M. (n.d.). Gun Deaths in America . Retrieved from FiveThirtyEight: https://fivethirtyeight.com/features/gun-deaths/

[4] Fatal Force: Police Shooting Database. Retrieved from Washington Post: https://www.washingtonpost.com/graphics/investigations/police-shootings-database/ 

[5] Nicoletti, L (2020). Visualizing deaths caused by policing in the United States, Retrieved from: https://www.leonardonicoletti.com/work/deathtoll 

[6] Belli, B (2020). Racial disparity in police shootings unchanged over 5 years：https://news.yale.edu/2020/10/27/racial-disparity-police-shootings-unchanged-over-5-years 

[7]  Ramshankar Yadhunath, Retrieved from Kaggle: Understanding the Extent of Police Abuse in the United States of America. https://www.google.com.hk/url?q=https://www.kaggle.com/thedatabeast/understanding-the-extent-of-police-abuse-in-the-us?select%3Ddeaths_arrests_race.csv&sa=D&source=editors&ust=1621436739320000&usg=AOvVaw1j8tFB_5g2HSletWaG9zvd 


# Acknowledgement
Data Source:
* [Data Police shootings](https://www.kaggle.com/mrmorj/data-police-shootings) and [Police Violence & Racial Equity Dataset](https://www.kaggle.com/jpmiller/police-violence-in-the-us) retrieved from Kaggle, which is derived from database of every fatal shooting in the United States by a police officer. 
* [Fatal Encounters](https://fatalencounters.org/our-visualizations/)
* [Population Distribution by Race/Ethnicity](https://www.kff.org/other/state-indicator/distribution-by-raceethnicity/?dataView=1&activeTab=graph&currentTimeframe=0&startTimeframe=11&selectedDistributions=white--black--hispanic--total&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D)

Analysis:
* [Understanding the Extent of Police Abuse in the United States of America](https://www.kaggle.com/thedatabeast/understanding-the-extent-of-police-abuse-in-the-us?select=deaths_arrests_race.csv)
* [Racial disparity in police shootings unchanged over 5 years](https://news.yale.edu/2020/10/27/racial-disparity-police-shootings-unchanged-over-5-years)

JS: 
* [Scroller](https://vallandingham.me/scroller.html)
* [Scroller2](https://medium.com/@bryony_17728/titanic-d3-scrolling-story-eaed1b6f5766)
* [Grid Map](https://github.com/analyzer2004/gridmap)
* [AOS](https://github.com/michalsnik/aos)
* [Nav Bar](https://codyhouse.co/gem/vertical-fixed-navigation-2)
* [Choropleth Map: US States](https://d3-geomap.github.io/map/choropleth/us-states/)
