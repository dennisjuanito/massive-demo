insert into incidents(state, injuryid, causeid) values(${state}, ${injuryid}, ${causeid})
returning *; 
--  by default insert do not return anything or empty array. you nned to use returning keyword