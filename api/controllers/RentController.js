/**
 * RentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// var XLSX = require('xlsx');
var xl = require('excel4node');

module.exports = {
    list:function(req,res){
        Rent.find({}).exec(function(err,rents){
            Vehicles.find({}).exec(function(err,vehicles){
                Client.find({}).exec(function(err,clients){
                    res.view('pages/rentPage',{Rents:rents, Vehicles:vehicles,Clients:clients});
                })
            })
        });
    },
    print:function(req,res){
        // var workbook = XLSX.readFile('assets/table/rent.ods'); // parse the file
        // var sheet = workbook.Sheets[workbook.SheetNames[0]];
        // sheet['C40']={t:'s', v:rent.from}
        
        
        
        // res.json(sheet)
        // XLSX.writeFile(workbook, 'assets/ViewerJS/page2.ods');
        
        rent=req.body.rent
        client=req.body.client[0]
        vehicle=req.body.vehicle[0]
        
        var wb = new xl.Workbook(
            {defaultFont: {
                size: 9,
                color: '#000000'
            },}
        );
        var options = {
            margins: {
                left: 0.2,
                right: 0.5,
                top: 0,
                bottom: 0,
                footer: 0,
                header: 0
            },
            printOptions: {
                centerHorizontal: true,
                centerVertical: true,
                printGridLines: false,
                printHeadings: false
            },
            pageSetup: {
                blackAndWhite: true,
                fitToHeight: 1, // Number of vertical pages to fit to
                fitToWidth: 1, // Number of horizontal pages to fit to
                orientation: 'portrait', // One of 'default', 'portrait', 'landscape'
                paperSize: 'A4_PAPER', // see lib/types/paperSize.js for all types and descriptions of types. setting paperSize overrides paperHeight and paperWidth settings
            },
        };

        var ws = wb.addWorksheet('Sheet1',options);

        var bold = wb.createStyle({
            font: {
                color: '#000000',
                bold: true,
            },
        });
        var boldAndBig = wb.createStyle({
            font :{
                bold: true,
                size: 11
            },
            alignment: {
                horizontal: "center"
            }
        });

        var greyBg = wb.createStyle({
            fill: { // §18.8.20 fill (Fill)
                type: "pattern",
                patternType: "solid",
                bgColor: "#000000", 
                fgColor: "#DDDDDD" 
            },
        })
        var border = wb.createStyle({
            border: { 
                left: {
                    style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                    color: "#000000" // HTML style hex value
                },
                right: {
                    style: "thin",
                    color: "#000000"
                },
                top: {
                    style: "thin",
                    color: "#000000"
                },
                bottom: {
                    style: "thin",
                    color: "#000000"
                },
                outline: true
            },
        })


        ws.column(1).setWidth(5);
        ws.column(2).setWidth(15);
        ws.column(3).setWidth(16);
        ws.column(4).setWidth(24);
        ws.column(5).hide();
        ws.column(6).setWidth(13);
        ws.column(7).setWidth(26);
        ws.column(8).setWidth(20);
        ws.column(9).setWidth(19);

        ws.row(10).setHeight(20);

        // ws.cell(2,2, 51, 9, true).style({
        //     alignment:{
        //         vertical: "center",
        //     },
        //     border: { 
        //         left: {
        //             style: "thin",
        //             color: "#000000"
        //         },
        //         right: {
        //             style: "thin",
        //             color: "#000000"
        //         },
        //         top: {
        //             style: "thin",
        //             color: "#000000"
        //         },
        //         bottom: {
        //             style: "thin",
        //             color: "#000000"
        //         }
        //     },
        // });

        ws.addImage({
            path: 'assets/table/logo.png',
            type: 'picture',
            position: {
                type: 'twoCellAnchor',
                from: {
                    col: 8,
                    colOff: 0,
                    row: 1,
                    rowOff: 0
                },
                to: {
                    col: 9,
                    colOff: 0,
                    row: 5,
                    rowOff: 0
                }
            }
        });

        ws.cell(5, 2, 5, 8, true).string('Номер на договор:     от дата:').style(boldAndBig).style(border);

        ws.cell(6, 2).string("Наемодател:").style(bold).style(border);
        ws.cell(6, 3, 6, 4, true).string("").style(border);
        ws.cell(7, 2, 7, 3, true).string("Днес:").style(border);
        ws.cell(7, 4).string("").style(border);
        ws.cell(8, 2, 8, 3,true).string("Пауър Джим ООД").style(border);
        ws.cell(8, 4).string("").style(border);
        ws.cell(9, 2, 9, 4, true).string("БУЛСТАТ:").style(border);
        // ws.cell(9, 3, 9, 4, true).string("");
        ws.cell(10, 2, 10, 3, true).string("Тел:0876557977").style(border);
        ws.cell(11, 2, 11, 3, true).string("Чрез представителя");
        ws.cell(11, 4).string("Ахмед Махмуд").style(bold);
        ws.cell(12, 2, 12, 4, true).string("Адрес: София ул.Тирана 14-16").style(bold).style(border);
        ws.cell(13, 2, 13, 4, true).string("Подпис:").style(boldAndBig).style(border);



        ws.cell(6, 6).string("Наемател:").style(bold).style(border);
        ws.cell(6, 7, 6, 9, true).string(client.name).style(border);
        ws.cell(7, 6, 7, 7, true).string("Фирма/организация/:").style(border);
        ws.cell(7, 8, 7, 9, true).string(client.firm).style(border);
        ws.cell(8, 6).string("МОЛ:");
        try{ws.cell(8, 7).string(client.MOL);}
        catch(e){ws.cell(8, 7).string("");}
        ws.cell(8, 8).string("БУЛСТАТ").style(border);
        try{ ws.cell(8, 9).string(client.bulstat).style(border);}
        catch(e){ws.cell(8, 9).string("").style(border);}
        ws.cell(9, 6).string("Име").style(border);
        ws.cell(9, 7, 9, 9, true).string(client.name).style(border);
        ws.cell(10, 6).string("Адрес").style(border);
        ws.cell(10, 7, 10, 9, true).string(client.address).style(border);
        ws.cell(11, 6).string("ЕГН:");
        ws.cell(11, 7).string("");
        ws.cell(11, 8).string("Тел").style(border);
        ws.cell(11, 9).string(client.phone).style(border);
        ws.cell(12, 6, 12, 7, true).string("№ на свидетелство за управление:").style(border);
        ws.cell(12, 8, 12, 9, true).string(client.licenseID).style(border);
        ws.cell(13, 6).string("Издадена на:").style(border);
        ws.cell(13, 7).string(client.licenseDate).style(border);
        ws.cell(13, 8).string("От МВР").style(border);
        ws.cell(13, 9).string(client.licenseMVR).style(border);
    
        ws.addImage({
            path: 'assets/table/bus.png',
            type: 'picture',
            position: {
                type: 'twoCellAnchor',
                from: {
                    col: 2,
                    colOff: 0,
                    row: 14,
                    rowOff: 0
                },
                to: {
                    col: 8,
                    colOff: 0,
                    row: 29,
                    rowOff: 0
                }
            }
        })
        ws.cell(14,2,29,8,true).style(border);


        ws.cell(30,2, 34, 9).style(greyBg);
        ws.cell(30, 2, 31, 4, true).string("Нает автомобил:").style(bold).style({font:{size:10}, alignment:{vertical: "top"}});
        ws.cell(30, 6, 31, 9, true).string("Състояние на автомобила  Предаване:").style({alignment:{vertical: "top"}});
        ws.cell(32, 6, 33, 9, true).string("Състояние на автомобила  Връщане:").style({alignment:{vertical: "top"}});


        var brand = [
            {bold:false,size:9},
            'Марка:',
            {bold:true,size:11},
            vehicle.brand
        ];
        var model = [
            {bold:false,size:9},
            'Модел:',
            {bold:true,size:11},
            vehicle.model
        ];
        var licenseNumber = [
            {bold:false,size:9},
            'Рег.№:',
            {bold:true,size:11},
            vehicle.licenseNumber
        ];
        var chassis = [
            {bold:false,size:9},
            'Шаси',
            {bold:true,size:11},
            vehicle.chassis
        ];
        ws.cell(32,2).string(brand);
        ws.cell(32,3).string(model);
        ws.cell(33,2).string(licenseNumber);
        ws.cell(34,2, 34, 3, true).string(chassis);

        ws.cell(35,2).string("Тарифа:").style(bold);
        ws.cell(36, 2, 36, 4, true).string(rent.due+' дни   Х  ______лв /без ДДС/');
        ws.cell(38, 2, 38, 4, true).string('Депозит:'+(rent.deposit==undefined? 0:rent.deposit)+'лв.');
        ws.cell(40,2).string('Дата').style(border);
        ws.cell(41,2).string('Час').style(border);
        ws.cell(42,2).string('КМ').style(border);
        ws.cell(43,2).string('Гориво').style(border);
        ws.cell(41,2).string('Вид гориво:ДИЗЕЛ').style(bold);
        ws.cell(41, 3, 43, 4).style(border);
        ws.cell(40,3).string(rent.from);
        ws.cell(41,3).string(rent.fhr);
        ws.cell(42,3).string(rent.kmtaken);
        ws.cell(42,4).string(rent.kmreturned);

        ws.cell(35, 6).string('Всичко:');
        ws.cell(36, 8).string('Наем:____________.');
        ws.cell(37, 7).string('+Допълнителни услуги:____________')
        ws.cell(38, 7, 38, 9, true).string('Общо дължима сума:'+rent.sum+'лв.').style(border);

        ws.cell(39,3).string('Предаване').style(border);
        ws.cell(39,4).string('Връщане').style(border);


        ws.cell(39, 7, 39, 8, true).string('1.Контактен ключ/аларма/').style(border);
        ws.cell(40, 7, 40, 8, true).string('2.Резервна гума/крик,ключ/').style(border);
        ws.cell(41, 7, 41, 8, true).string('3.Ниво течности/в норми/').style(border);
        ws.cell(42, 7, 42, 8, true).string('4.Аудио система/CD/').style(border);
        ws.cell(43, 7, 43, 8, true).string('5.Запалка/пепелник/').style(border);
        ws.cell(44, 7, 44, 8, true).string('6.Допълнително оборудване').style(border);
        ws.cell(39, 9, 44, 9).style(border);


        // ws.cell(45, 2, 47, 4, true).style(border);
        // ws.cell(45, 6, 47, 9, true).style(border);
        // ws.cell(48, 2, 51, 4, true).style(border);
        // ws.cell(48, 6, 51, 9, true).style(border);

        ws.cell(45, 2, 45, 3, true).string('Автомобилът приет');
        ws.cell(46, 2).string('Клиент');
        ws.cell(47, 3, 47, 4, true).string('Подпис:');
        ws.cell(45, 6, 45, 7, true).string('Автомобилът предаден');
        ws.cell(46, 6, 46, 7, true).string('Клиент');
        ws.cell(47, 8, 47, 9, true).string('Подпис:');

        ws.cell(48, 2, 48, 3, true).string('Автомобилът предаден');
        ws.cell(49, 2, 49, 3, true).string('“Пауър Джим ООД”').style(boldAndBig);
        ws.cell(51, 3, 51, 4, true).string('Подпис:');

        ws.cell(48, 6, 48, 7, true).string('Автомобилът приет');
        ws.cell(49, 6, 49, 7, true).string('“Пауър Джим ООД”').style(boldAndBig);
        ws.cell(51, 8, 51, 9, true).string('Подпис:');


        wb.write('assets/ViewerJS/page2.xlsx',function (err, stats) {
            if (err) {
                console.error(err);
            }  else {
                console.log(stats); // Prints out an instance of a node.js fs.Stats object
                res.status(200).json({status: "Okay"});
            }
        });
        // res.attachment('assets/ViewerJS/page2.xlsx');

    },    

};

