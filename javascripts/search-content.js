// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}
 /* function getISOStrict(date) {
   
   if (Date.prototype.toISOString) {
        return date.toISOString().replace(/Z$/, "+0000");
    }

    function pad(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    }

    return date.getUTCDate();
       + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCFullYear() );
        + 'T' + pad( date.getUTCHours() )
       + ':' + pad( date.getUTCMinutes() )
       + ':' + pad( date.getUTCSeconds() )
       + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
       + '+0000'; 
} */

// Perform a search and display the results
function search() {
    
    $("search-results").html("");
    gadgets.window.adjustHeight();
   /* var types = [];
    $("input:checked").each(function() {
        types.push(this.id);
    });*/
    var params = {
        //limit : $("#limit").val(),
        query : $("#query").val(),
        //sort : $("#sort-type").val(),
       // sortOrder : $("#sort-order").val()
        
        
    };

   
   /* if (types.length > 0) {
        params.type = types;
    }*/
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       //console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
			var rows = response.data;
			
            var html = "";
			var blog="";
			var discussion="";
			var update="";
			var document="";
			var post="";
			           
            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var avatar="";
            var modifiedDate="";
            var likeCount="";
			var replyCount="";
            var type="";
            var username="";
            var creationDate="";
			var name="";
			var displayName="";
            
				$.each(rows, function(index, row) {   
					url=row.resources.html.ref;
					subject=row.subject;
					contentSummary=row.contentSummary;
					author=row.author.name;
					modifiedDate=row.modificationDate;
					likeCount=row.likeCount;
					replyCount=row.replyCount;
					type=row.type;
					avatar=row.author.avatarURL;
					username=row.author.username;
					
						if(row.type=="discussion"){
							 var discussionID = (url.substring(url.lastIndexOf("/"))).substr(1);
							console.log("discussion Id " + discussionID); 
							/*var finalDocID = (url.substring(url.lastIndexOf("-"))).substr(1);
							console.log("finalDocID Id " + finalDocID);*/
							var request = osapi.jive.core.discussions.get({id: discussionID});
							console.log("After doc Request");
							request.execute(function(response) { 
							console.log("searching documents response is " + JSON.stringify(response.data));
							var message=response.data;
							if (response.error) {
								console.log("Error in get: "+response.error.message);
								}
								else
								{
									var request = message.container.get();
									request.execute(function(response) {
										 if(!response.error) {
											var container = response.data;
											console.log("searching discussion container response is " + JSON.stringify(response.data));
											if(container instanceof osapi.jive.core.Group) { 
													console.log("discussion Display Name ::" +container.displayName);
													creationDate=message.creationDate;
													if(container.displayName == "accenturetest")
													{
														console.log("I am here:::discussion!");
														discussion +='<div>';
														discussion +='<ul>';
														discussion +='<li class="discussion"/>';
														discussion +='<a href="'+url+'">'+subject+'</a></li>';
														discussion +='</ul>';
														
														discussion +='<h5>';
														discussion +='<ul>';
														discussion +='<li>Created by<a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
														discussion +='</ul>';
													   
														discussion +='<ul>';
														discussion +='<b>';
														discussion +='<li>'+contentSummary+'</li>';
														discussion +='</b>';
														discussion +='</ul>';
													   
														discussion +='<ul>';                                       
														discussion +='<li>Created:'+creationDate+'</li>';
														discussion +='<li>Last Modified:'+modifiedDate+'</li>';                
														discussion +='<li>Replies:'+replyCount+'</li>';                  
														discussion +='<li>Likes:'+likeCount+'</li>';              
														discussion +='</ul>';	
														discussion +='</div>';	
														console.log("Html discussion: "+ discussion);
														console.log("completed discussion:");
														html +=discussion;														
													}
													
													
											}
											console.log("Html:: "+html);
											$("#search-results").html(html);
											$("#search-info").show();
											gadgets.window.adjustHeight();
										 
										 }
									
									});
								
								}
							 });
						}
						
						
			  
				});
            
				
				//html +="<br>"+document;
				//html +="<br>"+update;
				//html +="<br>"+post;
				//html +="<br>"+blog;
			
				
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
