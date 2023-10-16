const element_katta_log = document.getElementById("KattaLog");
const dict_katta_log = JSON.parse(element_katta_log.innerText);
const list_katta_log = dict_katta_log["KattaList"];
const date_hajimete = new Date(dict_katta_log["Hajimete"]);
const date_kyo = new Date(dict_katta_log["Kyo"]);
//ウィンドウの読み込み処理（定数データの取得、年オプションのリスト化、年月オプションを今月に設定、今月のグラフを描画）
window.onload = function(){
    for(let int_katta_cnt in list_katta_log){
        Katta = list_katta_log[int_katta_cnt];
        let Itsu_str = Katta["Itsu"];
        let Itsu_date = new Date(Itsu_str);
        list_katta_log[int_katta_cnt]["Itsu_date"] = Itsu_date;
    }
    let date_current = new Date(date_kyo); 
    const list_date_all = [];
    while(date_current.getTime() >= date_hajimete.getTime()){ 
        list_date_all.push(new Date(date_current)); 
        date_current.setDate(date_current.getDate() - 1);
    }
    const year_list = []
    for(let date of list_date_all){
        let year = date.getFullYear();
        if(year_list.includes(year) == false){
            year_list.push(year);
        }
    }
    let select_year_dayly = document.getElementById("years_dayly");
    for(let year of year_list){
        let option_year = document.createElement("option");
        option_year.value = year.toString();
        option_year.text = year.toString() + "年";
        select_year_dayly.appendChild(option_year);
    }
    select_year_dayly.querySelector("option[value='"+date_kyo.getFullYear().toString()+"']").selected=true;
    set_year_option_dayly();
    let select_month_dayly = document.getElementById("months_dayly");
    let option_month_dayly = select_month_dayly.querySelector("option[value='"+date_kyo.getMonth().toString()+"']")
    option_month_dayly.selected = true;
    draw_graph_dayly(date_kyo.getFullYear(),date_kyo.getMonth());
    let select_year_pie = document.getElementById("years_pie");
    for(let year of year_list){
        let option_year = document.createElement("option");
        option_year.value = year.toString();
        option_year.text = year.toString()+"年";
        select_year_pie.appendChild(option_year);
    }
    select_year_pie.querySelector("option[value='"+date_kyo.getFullYear().toString()+"']").selected = true;
    set_year_option_pie();
    draw_graph_pie(date_kyo.getFullYear(),date_kyo.getMonth());
    let select_year_monthly = document.getElementById("years_monthly");
    for(let year of year_list){
        let option_year = document.createElement("option");
        option_year.value = year.toString();
        option_year.text = year.toString() + "年";
        select_year_monthly.appendChild(option_year);
    }
    set_year_option_monthly();
    draw_graph_monthly(date_kyo.getFullYear(),date_kyo.getMonth());
}
//指定された年の月リストを表示
///デイリーグラフ
function set_year_option_dayly(){
    let select_year_dayly = document.getElementById("years_dayly");
    let year_value = select_year_dayly.value;
    let list_month = []
    for(let katta of list_katta_log){
        let date = katta.Itsu_date;
        if(date.getFullYear() == year_value){
            let month = date.getMonth();
            if(list_month.includes(month) == false){
                list_month.push(month);
            }
        }
    }
    let select_month_dayly = document.getElementById("months_dayly");
    while(select_month_dayly.options.length > 0){
        select_month_dayly.removeChild(select_month.options[0]);
    }
    for(let month of list_month){
        let option_month = document.createElement("option");
        option_month.value = month;
        option_month.text = (month+1).toString() + "月";
        select_month_dayly.appendChild(option_month);
    }
}
///円グラフ
function set_year_option_pie(){
    let select_year_pie = document.getElementById("years_pie");
    let year_value = select_year_pie.value;
    let list_month = []
    for(let katta of list_katta_log){
        let date = katta.Itsu_date;
        if(date.getFullYear() == year_value){
            let month = date.getMonth();
            if(list_month.includes(month) == false){
                list_month.push(month);
            }
        }
    }
    let select_month_pie = document.getElementById("months_pie");
    while(select_month_pie.options.length > 0){
        select_month_pie.removeChild(select_month_pie.options[0]);
    }
    for(let month of list_month){
        let option_month = document.createElement("option");
        option_month.value = month;
        option_month.text = (month+1).toString()+"月";
        select_month_pie.appendChild(option_month);
    }
}
///マンスリーグラフ
function set_year_option_monthly(){
    let select_year_monthly = document.getElementById("years_monthly");
    let year_value = select_year_monthly.value;
    let list_month = []
    for(let katta of list_katta_log){
        let date = katta.Itsu_date;
        if(date.getFullYear() == year_value){
            let month = date.getMonth();
            if(list_month.includes(month) == false){
                list_month.push(month);
            }
        }
    }
    let select_month_monthly = document.getElementById("months_monthly")
    while(select_month_monthly.options.length > 0){
        select_month_monthly.removeChild(select_month_monthly.options[0]);
    }
    for(let month of list_month){
        let month_add = document.createElement("option");
        month_add.value = month;
        month_add.text = (month+1).toString()+"月";
        select_month_monthly.appendChild(month_add);
    }
}
//指定された年月のグラフを表示
///デイリーグラフ
function draw_graph_dayly(year,month){
    let start_date = new Date(year,month,1)
    let last_date = new Date(start_date)
    last_date.setMonth(last_date.getMonth()+1);
    last_date.setDate(last_date.getDate()-1);
    if(last_date.getTime() > date_kyo.getTime()){
        last_date = new Date(date_kyo);
    }
    let list_date_show = []
    let list_date_int = []
    let date_current = new Date(start_date);
    while(date_current.getTime() <= last_date.getTime()){
        list_date_show.push(new Date(date_current));
        list_date_int.push(date_current.getDate());
        date_current.setDate(date_current.getDate() + 1);
    }
    let list_date_ikura = []
    for(get_date of list_date_show){
        list_date_ikura.push(get_sum_date(get_date));
    }
    let canvas_graph = document.getElementById("DaylyGraph");
    let dayly_chart = new Chart(
        canvas_graph,
        {
            type:"line",
            data:{
                labels:list_date_int,
                datasets:[{
                    type:"line",
                    tension:0,
                    label:"Ikura_Nichiji",
                    fill : false,
                    borderColor:"blue",

                    data:list_date_ikura
                }]
            },
            options:{
                responsive:false,
                scales:{
                    x:{
                        ticks:{
                            display:true
                        }
                    },
                    y:{
                        ticks:{
                            min:0,
                            display:true
                        }
                    }
                }
            }
        }
    );
}
//該当する月のDeokodeの円グラフ
function draw_graph_pie(year,month){
    let start_date = new Date(year,month,1)
    let last_date = new Date(start_date)
    last_date.setMonth(last_date.getMonth()+1);
    last_date.setDate(last_date.getDate()-1);
    let list_dokode = []
    for(katta of list_katta_log){
        if(katta["Itsu_date"].getFullYear() === year && katta["Itsu_date"].getMonth()){
            let dokode = katta.Dokode;
            if(list_dokode.includes(dokode) === false){
                list_dokode.push(dokode);
            }
        }
    }
    let list_ikura = []
    for(dokode of list_dokode){
        let ikura = get_sum_month_dokode(year,month,dokode);
        list_ikura.push(ikura);
    }
    let list_color = generateGradientColods("#FF0000","#0000FF",list_ikura.length);
    let canvas_pie = document.getElementById("PieGraph");
    let pie_chart = new Chart(
        canvas_pie,
        {
            type:"pie",
            data:{
                labels : list_dokode,
                datasets:[{
                    backgroundColor:list_color,
                    data:list_ikura
                }]
            },
            options:{
                responsice:false,

            }
        }
    )
}

//過去12ヶ月間のグラフを描画
function draw_graph_monthly(year,month){
    let last_date = new Date(year,month,1);
    last_date.setMonth(last_date.getMonth()+1);
    last_date.setDate(last_date.getDate()-1);
    let start_date = new Date(year-1,month,1);
    let list_month_date = []
    let date_current = start_date;
    while(date_current.getTime() < last_date.getTime()){
        list_month_date.push(new Date(date_current));
        date_current.setMonth(date_current.getMonth()+1)
    }
    let list_month_str = []
    let list_month_ikura = []
    for(let month of list_month_date){
        list_month_str.push(month.getFullYear().toString()+"/"+(month.getMonth()+1).toString());
        list_month_ikura.push(get_sum_month(month.getFullYear(),month.getMonth()))
    }
    let monthly_graph = document.getElementById("MonthlyGraph");
    let monthly_chart = new Chart(
        monthly_graph,
        {
            type:"line",
            data:{
                labels:list_month_str,
                datasets:[
                    {
                        type:"line",
                        tension:0,
                        label:"Ikura_Getsuji",
                        fill:false,
                        borderColor:"red",
                        data:list_month_ikura
                    }
                ]
            },
            options:{
                responsive:false,
                scales:{
                    x:{
                        ticks:{
                            display:true
                        }
                    },
                    y:{
                        ticks:{
                            min:0,
                            display:true
                        }
                    }
                }
            }
        }
    )
}
//オプションに対応してグラフを描画する関数
///デイリーグラフ
function change_months_option_dayly(){
    let year_value = ParseInt(document.getElementById("years_dayly").value,10);
    let month_value = ParseInt(document.getElementById("months_dayly").value,10);
    draw_graph_dayly(year_value,month_value);
}
///円グラフ
function change_months_option_pie(){
    let year_value = ParseInt(document.getElementById("years_pie").value,10);
    let month_value = ParseInt(document.getElementById("months_pie").value,10)
    draw_graph_pie(year_value,month_value);
}
///マンスリーグラフ
function change_months_option_monthly(){
    let year_value = ParseInt(document.getElementById("years_monthly").value,10);
    let month_value = ParseInt(document.getElementById("months_moonthly").value,10);
    draw_graph_monthly(year_value,month_value);
}
//指定された日付のIkura合計値を取得
function get_sum_date(get_date){
    let int_sum_date = 0;
    for(katta of list_katta_log){
        if(katta["Itsu_date"].getTime() === get_date.getTime()){
            int_sum_date = int_sum_date + katta["Ikura"];
        }
    }
    return int_sum_date;
}
//指定された年月とDokodeのIkura合計値を取得
function get_sum_month_dokode(year,month,dokode){
    let int_sum_year_month_dokode = 0;
    for(katta of list_katta_log){
        if(katta["Itsu_date"].getFullYear() === year && katta["Itsu_date"].getMonth() === month && katta["Dokode"] === dokode){
            int_sum_year_month_dokode = int_sum_year_month_dokode + katta["Ikura"];
        }
    }
    return int_sum_year_month_dokode;
}
//指定された年月のIkura合計値を取得
function get_sum_month(year,month){
    let int_sum_year_month = 0;
    for(katta of list_katta_log){
        if(katta["Itsu_date"].getFullYear() === year && katta["Itsu_date"].getMonth() === month){
            int_sum_year_month = int_sum_year_month + katta["Ikura"];
        }
    }
    return int_sum_year_month;
}

//カラーコードをグラデーションで取得する関数
function generateGradientColods(startColor,endColor,numSteps){
    let startRGB = hex_to_rgb(startColor);
    let endRGB = hex_to_rgb(endColor);
    let colors = []
    for(let i = 0 ; i < numSteps ; i++){
        r = Math.round(startRGB.r + ( i / (numSteps - 1)) * (endRGB.r - startRGB.r));
        g = Math.round(startRGB.g + ( i / (numSteps - 1)) * (endRGB.g - startRGB.g));
        b = Math.round(startRGB.b + ( i / (numSteps - 1)) * (endRGB.b - startRGB.b));
        colors.push(rgb_to_hex(r,g,b));
    }
    return colors;
}

function hex_to_rgb(hex){
    let bigint = parseInt(hex.slice(1),16);
    let rgb = {
        r :(bigint >> 16) & 255,
        g :(bigint >>8) & 255,
        b :bigint & 255
    };
    return rgb
}

function rgb_to_hex(r,g,b){
    return "#" + ((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1).toUpperCase();
}