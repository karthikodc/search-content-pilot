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
					
						if(row.type=="document"){
							/* var documentID = (url.substring(url.lastIndexOf("/"))).substr(1);
							console.log("documents Id " + documentID); */
							var finalDocID = (url.substring(url.lastIndexOf("-"))).substr(1);
							console.log("finalDocID Id " + finalDocID);
							//var request = 
							osapi.jive.core.documents.get({id: finalDocID}).execute(function(response) { 
							console.log("After doc Request");
							//request
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
											console.log("searching documents container response is " + JSON.stringify(response.data));
											if(container instanceof osapi.jive.core.Group) { 
													console.log("Document Display Name ::" +container.displayName);
													creationDate=message.creationDate;
													if(container.displayName == "accenturetest")
													{
														console.log("I am here:::document!");
														document +='<ul>';
														document +='<li class="document"/>';
														document +='<a href="'+url+'">'+subject+'</a></li>';
														document +='</ul>';
														
														document +='<h5>';
														document +='<ul>';
														document +='<li>Created by<a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
														document +='</ul>';
													   
														document +='<ul>';
														document +='<b>';
														document +='<li>'+contentSummary+'</li>';
														document +='</b>';
														document +='</ul>';
													   
														document +='<ul>';                                       
														document +='<li>Created:'+creationDate+'</li>';
														document +='<li>Last Modified:'+modifiedDate+'</li>';                
														document +='<li>Replies:'+replyCount+'</li>';                  
														document +='<li>Likes:'+likeCount+'</li>';              
														document +='</ul>';											
													}
													console.log("Html Document:" + document);
											}
										 
										 }
									
									});
								
								}
							 });
						}
						
						
			  
				});
            
				console.log("completed Document:");
				html +=discussion;
				html +="<br>"+document;
				html +="<br>"+update;
				html +="<br>"+post;
				html +="<br>"+blog;
			
				// console.log(html);
				$("#search-results").html(html);
				$("#search-info").show();
				gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
