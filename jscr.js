        "use strict";
         //кофе машина
		var coffeeMachine = new Object();
        coffeeMachine["message"] = 'Ваш кофе готов';
        coffeeMachine["start"]  = function (){
              setTimeout(function() {coffeeMachine.end();}, 3000);
            }
         coffeeMachine["end"] = function () {
             alert(this.message);
         }



         //объект с методами
		var user = new Object();
        user["name"] = 'Ваня';
        user["getName"]  = function (){
                $('#usr_name').val(this.name)
                console.log(this.name);
                return this.name;
            }
        user["setName"]  = function (name){
               this.name = name;
               console.log(this.name);
            }


         //объект калькулятор
		var calculator = new Object();
        user["x"] = 0;
        user["y"] = 0;
        calculator["sum"]  = function (){
                return (this.x + this.y);
            }
        calculator["multi"]  = function (){
                return (this.x * this.y);
            }
       calculator["read"]  = function (){
                this.x = parseInt(prompt("Ведите X: "));
                this.y = parseInt(prompt("Ведите Y: "));

            }



  //суммир матриц
    function summatrix(){
         var m1 = JSON.parse($("#matrix1").val());
         var m2 = JSON.parse($("#matrix2").val());
         //sm(m1,m2);
         var res = sm(m1,m2)
         if (res==null)
                 $("#answer3").html("Разный размер матриц");
         else
                 $("#answer3").html(JSON.stringify(res));
         console.log();       //console.log(m1.split('],['));
    }

    function sm(m1,m2){
        if (m1.length == m2.length){
            if (m1.length>1){
                var arr = new Object();
                for (var i=0; i<m1.length;i++){
                    arr[i] = sm(m1[i],m2[i])
                    if (arr[i] == null) return null;
                }
                return  arr;
            }
            else
                return parseInt(m1)+parseInt(m2);

        }
        else
            return null;
    }



    function parseStr(){
        var splarr = $("#dz1str").val().split(', ');
        var ind = splarr.indexOf($("#dz1del").val());
        if (ind>0) splarr.splice(ind,1);
        $("#answer1").text(splarr.join(', '));
        console.log(ind, splarr);
    }




//работа с массивом людей
    function CreateArray(){

        var params = [["Женя",45,"male",30000,true,[["Гена",3,"male"]]],
            ["Костя",34,"male",432534,true,[]],
            ["Гена",54,"male",6547,false,[["Джон",7,"male"],["Глафила",4,"female"]]],
            ["Петр",22,"male",6534,false, [["Одя",12,"female"]]],
            ["Джон",77,"male",998,true,[["Сельвестра",2,"female"],["Петр",13,"male"]]],
            ["Клара",55,"female",56543,false,[["Петр",15,"male"]]],
            ["Глафила",33,"female",23233,false, [["Роза",8,"female"]]],
            ["Роза",43,"female",98232,true,[]],
            ["Одя",32,"female",87433,false,[["Клара",17,"female"], ["Роза",8,"female"]]],
            ["Сельвестра",66,"female", 45342, true,[["Костя",14,"male"]]]];



        var persons = [];
        for (var i=0; i<10; i++){
            persons[i] = new Object();

            persons[i].name = params[i][0];
            persons[i].age = params[i][1];
            persons[i].sex = params[i][2];
            persons[i].salary = params[i][3];
            persons[i].married = params[i][4];
            persons[i].children = [];
            for (var j=0; j<params[i][5].length; j++){
                persons[i].children[j] = new Object();
                persons[i].children[j].name = params[i][5][j][0];
                persons[i].children[j].age = params[i][5][j][1];
                persons[i].children[j].sex = params[i][5][j][2];
            }


        }
        //console.log(persons);
        newfilter(persons, clb)
    }

    //callback
    function clb(item){
        //console.log(items);
        switch ($('input[name=filter]:checked').attr('value')){
            case '1':
                    if ((item.age>=18)&&(item.age<=24))
                        return true;
                break;
            case '2':
                    if (item.salary<1000)
                            return true;
                break;
            case '3':
                    if ((item.sex == 'female')&&(item.age>35))
                            return true;
                break;
            case '4':
                    if ((item.sex == 'male')&&(item.married == true ))
                            return true;
                break;
            case '5':
                    if (((item.sex == 'female')&&(item.age<35)&&(item.married ==false)) ||((item.sex == 'male')&&(item.salary>2000)&&(item.married ==true)) )
                            return true;
                break;
            case '6':
                    if ((item.children.length>0))
                            return true;
                break;
            case '7':
                    if ((item.sex == 'male')&&(item.married ==false))
                    {
                        var ch=0;
                        for (var i=0;i<item.children.length; i++)
                            if (item.children[i].age<5) ch++;
                        if (ch)  return true;
                    }
                break;
            case '8':
                return true;
                break


        }
        return false;

    }



    function newfilter(persons, callback){
        var sorted_persons = [];
        var j=0;
        for (var i = 0; i< persons.length; i++) {
            if (callback(persons[i])){
                sorted_persons[j] = new  Object();
                sorted_persons[j++] = persons[i];
            }


        }

        show_result(sorted_persons);
    }


    //вывод отфильтрованных данных
    function show_result(data){
        var elem = document.getElementById('answer2');
        var html_str = '';
        html_str ="<table border=0><tbody>";


        for (var i = 0; i< data.length; i++){
            html_str += "<tr><td valign='top'><b>"+(i+1)+"</b></td><td><ul type=\"circle\">";
           // var s = JSON.stringify(data[i]);
            //console.log(s);
            var s = data[i];
            html_str += "<li><b>Name:</b> "+s.name+"</li>";
            html_str += "<li><b>Age: </b>"+s.age+"</li>";
            html_str += "<li><b>Sex:</b> "+s.sex+"</li>";
            html_str += "<li><b>Salary: </b>"+s.salary+"</li>";
            html_str += "<li><b>Married: </b>"+(s.married?"yes":'no')+"</li>";
             html_str += "<li><b>Children:</b>"+(s.children.length?'':'-')+" </li>";
             html_str += "</ul></td><td></td></tr>";
             for (var j = 0; j< s.children.length; j++) {
                html_str += "<tr><td></td><td valign='top' align='right'><b>" + (j + 1) + "</b></td><td><ul type='square'>";
                html_str += "<li><b>Name:</b> "+s.children[j].name+"</li>";
                html_str += "<li><b>Age: </b>"+s.children[j].age+"</li>";
                html_str += "<li><b>Sex:</b> "+s.children[j].sex+"</li>";

                html_str += "</ul></td></tr>";
            }



            //console.log(sorted_persons);
        }
        html_str+="</tbody></table><br><br>";
        elem.innerHTML=html_str;
    }




