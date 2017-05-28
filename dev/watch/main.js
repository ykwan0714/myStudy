Main = {};
(function(_O){
    /**
     * @ author : yongkwan
     * @date: 2017.04
     * @breif : body의 onload에서 호출한다.
     */
    _O.init = function(){
       _O.Html.set();
       _O.Ctrl.set();
    };
    /**
     * @ author : yongkwan
     * @date: 2017.04
     * @breif : 내부에서 사용될 value들이 선언된 obj
     */
    _O.Vars = {
        timeShape : [ // 1/0 값으로 숫자의 모양을 구성한다.
            [
            1, 1, 1, 
            1, 0, 1,
            1, 0, 1,
            1, 0, 1,
            1, 1, 1
            ],
            [ 
            0, 1, 0, 
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
            ],
            [ 
            1, 1, 1, 
            0, 0, 1,
            1, 1, 1,
            1, 0, 0,
            1, 1, 1
            ],
            [ 
            1, 1, 1, 
            0, 0, 1,
            1, 1, 1,
            0, 0, 1,
            1, 1, 1
            ],
            [ 
            1, 0, 1, 
            1, 0, 1,
            1, 1, 1,
            0, 0, 1,
            0, 0, 1
            ],
            [ 
            1, 1, 1, 
            1, 0, 0,
            1, 1, 1,
            0, 0, 1,
            1, 1, 1
            ],
            [ 
            1, 1, 1, 
            1, 0, 0,
            1, 1, 1,
            1, 0, 1,
            1, 1, 1
            ],
            [ 
            1, 1, 1, 
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
            ],
            [ 
            1, 1, 1, 
            1, 0, 1,
            1, 1, 1,
            1, 0, 1,
            1, 1, 1
            ],
            [ 
            1, 1, 1, 
            1, 0, 1,
            1, 1, 1,
            0, 0, 1,
            0, 0, 1
            ]
        ],
        colon : 
            [
            0, 0, 0, 
            0, 1, 0,
            0, 0, 0,
            0, 1, 0,
            0, 0, 0
            ]
    }
    _O.Ctrl = {
        /**
         * @ author : yongkwan
         * @date: 2017.04
         * @breif : 처음 진입시 화면에 시간을 표시한다. 이후 매 초마다 갱신한다.
         */
        set : function(){
            this.changeDate();
            setInterval(this.changeDate,1000);
        },
         /**
         * @ author : yongkwan
         * @date: 2017.04
         * @breif : 길이가 1인 value 앞에 0을 넣어서 두자리로 만들어준다.
         * @return value : 두자리 string
         */
        cnvTwoDigit : function(value){
            if(value.length<2) value = '0'+value;
            return value;
        },
         /**
         * @ author : yongkwan
         * @date: 2017.04
         * @breif : 현재 시간을 시, 분, 초로 나누어 바꾼다.
         */
        changeDate : function(){
            var date = new Date(),
                hours = _O.Ctrl.cnvTwoDigit(date.getHours().toString()).split(''),
                miniutes = _O.Ctrl.cnvTwoDigit(date.getMinutes().toString()).split(''),
                seconds = _O.Ctrl.cnvTwoDigit(date.getSeconds().toString()).split('');
            _O.Ctrl.calChangeTime(hours.concat(miniutes).concat(seconds));
            setTimeout(function(){
                // colon이 매 초마다 깜빡이게 하기 위해 active class를 제거한다.
                var os = document.querySelectorAll('.time-item[colon="true"] .active');
                var length = os.length;
                for(var i=0; i<length; i++){
                     os[i].classList.remove('active');
                }
            },500);
        },
         /**
         * @ author : yongkwan
         * @date: 2017.04
         * @breif : 시간을 받아서 각 자리의 변경이 필요한지 확인한다.
         * @param time : 시간 string(시+분+초)
         */
        calChangeTime : function(time){
            var os = document.querySelectorAll('.time-item'),
                length = os.length,
                baseIdx = 0;
            for(var i=0; i<length; i++){
                if(i ==2 || i == 5){ //colon은 baseIdx 계산을 하지 않는다.
                    this.changeItem(os[i], _O.Vars.colon);
                    continue;
                }
                //time[baseIdx]는 시분초의 각 자리이다. ex) 140228=>1,4,0,2,2,8
                if(time[baseIdx] != os[i].getAttribute('time')){ 
                    os[i].setAttribute('time', time[baseIdx]);
                    this.changeItem(os[i], _O.Vars.timeShape[time[baseIdx]]);
                }
                baseIdx++;
            }
        },
         /**
         * @ author : yongkwan
         * @date: 2017.04
         * @breif : timeShape의 모습에 맞게 dom을 변경한다.
         * @param target : 변경이 필요한 dom
         * @param timeShape : 숫자에 맞는 timeShape Array  
         */
        changeItem : function(target, timeShape){
            for(var i=0; i<5; i++){
                rowValue = timeShape.slice(3*i, 3*i+3);
                for(var j =0; j<3; j++){
                    target.children[i].children[j].classList.remove('active');
                    //0,1인지 확인하여 1이면 active class를 추가한다.
                    if(rowValue[j]) target.children[i].children[j].classList.add('active');
                }
            }
        }
    };
    _O.Html = {
        set : function(){
            var o = document.getElementById('main'),
                str = _O.Html.getItem() + _O.Html.getItem() + _O.Html.getItem(true) +_O.Html.getItem() +_O.Html.getItem()+ _O.Html.getItem(true) +_O.Html.getItem() +_O.Html.getItem();
            o.innerHTML = str;
        },
        getItem : function(colon){
            var str='<div class="time-item" '+(colon ? 'colon="true"' : '')+'>';
            for(var i=0; i<5; i++){
                str+= this.getRow();
            }
            str +='</div>';

            return str;
        },
        getRow : function(){
            var str = '<div class="row">';
            for(var i=0; i<3; i++){
                str += '<div class="row-item"></div>';
            }
            str+= '</div>';
            
            return str;
        }
      
    }


})(Main);