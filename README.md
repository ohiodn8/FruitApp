<h1>Fruit App</h1>
<p>This is a simple NodeJS application to create a list of fruits in a table. And a searchbar to search for fruits.</p>
<ul>
<h4>Things to Note:</h4>
<li>Database: sqlite3</li>
<li>You can install the application in an AWS ec2 instance by running the Cloud Formation Template in the repository. Name of CF Template: setup_nodejs</li>
<li></li>
<li>Sample look of application (not the real thing) <a href="" target="_blank">Sample-Look</a></li>
<li>The application has api endpoints, in case you decide to consume the json page.</li>    
</ul><br>

<h3>How to use:</h3>
<p><em><i>Just download the CF template and run it or clone the repo to install manually *v*</i></em></p>
<p>Option 2: Clone Github repo</p>
<p>Then cd into the folder</p>
<pre>cd FruitApp</pre>
<pre>npm install</pre>
<pre>npm start</pre>
<h4>Visit url=> <a href="http://localhost:80" target="_blank">http://localhost:80</a></h4><br>


<h4>To checkout the json page/endpoint, visit => http://localhost:80/api/fruits</h4><br>
<h4>To checkout the json page/endpoint, visit => http://localhost:80/api/fruits/:name</h4><br>