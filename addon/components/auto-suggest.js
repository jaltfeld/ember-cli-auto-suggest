import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import layout from '../templates/components/auto-suggest';

export default Component.extend(layout, {
  layout,
  findAllList: null,
	filterProps: null,
	resultList: null,
	inputVal: null,
	activeLength: 3,
	placeholder: null,

	resultListSet: computed('resultList', function(){
		return (this.get('resultList')? true: false);
	}),

	searchListDidChange: observer('findAllList', function(){
		this.runFilter();
	}),

	inputDidChange: observer('inputVal', function(){
		this.runFilter();
	}),

	runFilter() {
		if(this.get('inputVal').length > this.get('activeLength')){
			this.filter(this.get('findAllList'), this.get('inputVal'));
		}else{
			this.set('resultList', null);
		}
	},

	filter(list, term) {
		const newList = list.filter((item)=>{
			const self = this;
			const compareFilterProps = (function(){
				let termMatchesAProp = false;
				self.get('filterProps').forEach((prop)=>{
					if(!!item.get(prop) && item.get(prop).toLowerCase().indexOf(term.toLowerCase()) !== -1){
						termMatchesAProp = true;
					}
				});
				return termMatchesAProp;
			}());

			return compareFilterProps;
		});

		this.set('resultList', newList);
	},

	actions: {
		closureFunc(result, add){
			this.get('closure')(result, add);
		},
		changeInputVal(newVal){
			this.set('inputVal', newVal);
		}
	}
});
