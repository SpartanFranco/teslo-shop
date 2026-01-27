'use client';

import { createUpdateProduct, deleteProductImage } from '@/src/actions';
import { ProductImage } from '@/src/components';
import { Category, Gender, Product } from '@/src/interfaces';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';

interface Props {
	product: Partial<Product>;
	categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

interface FormInput {
	title: string;
	slug: string;
	description: string;
	price: number;
	inStock: number;
	sizes: string[];
	tags: string;
	gender: Gender;

	categoryId: string;

	images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		control,
		formState: { isValid },
	} = useForm<FormInput>({
		defaultValues: {
			...product,
			tags: product.tags?.join(','),
			sizes: product.sizes ?? [],

			//todo Images
			images: undefined,
		},
	});

	const sizesSelected = useWatch({
		control,
		name: 'sizes',
	});

	const onSizeChange = (size: string) => {
		const sizes = new Set(getValues('sizes'));

		sizes.has(size) ? sizes.delete(size) : sizes.add(size);

		setValue('sizes', Array.from(sizes));
	};

	const onSubmit = async (data: FormInput) => {
		const formData = new FormData();

		const { images, ...productToSave } = data;

		if (product.id) {
			formData.append('id', product.id ?? '');
		}
		formData.append('title', productToSave.title);
		formData.append('slug', productToSave.slug);
		formData.append('description', productToSave.description);
		formData.append('price', productToSave.price.toString());
		formData.append('inStock', productToSave.inStock.toString());
		formData.append('sizes', productToSave.sizes.toString());
		formData.append('tags', productToSave.tags);
		formData.append('categoryId', productToSave.categoryId);
		formData.append('gender', productToSave.gender);

		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append('images', images[i]);
			}
		}

		const {
			ok,
			message,
			product: productResponse,
		} = await createUpdateProduct(formData);
		if (!ok) {
			alert(message);
			return;
		}
		router.replace(`/admin/product/${productResponse?.slug}`);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0'
		>
			{/* Textos */}
			<div className='w-full'>
				<div className='mb-2 flex flex-col'>
					<span>Título</span>
					<input
						type='text'
						className='rounded-md border bg-gray-200 p-2'
						{...register('title', { required: true })}
					/>
				</div>

				<div className='mb-2 flex flex-col'>
					<span>Slug</span>
					<input
						type='text'
						className='rounded-md border bg-gray-200 p-2'
						{...register('slug', { required: true })}
					/>
				</div>

				<div className='mb-2 flex flex-col'>
					<span>Descripción</span>
					<textarea
						rows={5}
						className='rounded-md border bg-gray-200 p-2'
						{...register('description', { required: true })}
					></textarea>
				</div>

				<div className='mb-2 flex flex-col'>
					<span>Price</span>
					<input
						type='number'
						className='rounded-md border bg-gray-200 p-2'
						{...register('price', { required: true, min: 0 })}
					/>
				</div>

				<div className='mb-2 flex flex-col'>
					<span>Tags</span>
					<input
						type='text'
						className='rounded-md border bg-gray-200 p-2'
						{...register('tags', { required: true })}
					/>
				</div>

				<div className='mb-2 flex flex-col'>
					<span>Gender</span>
					<select
						className='rounded-md border bg-gray-200 p-2'
						{...register('gender', { required: true })}
					>
						<option value=''>[Seleccione]</option>
						<option value='men'>Men</option>
						<option value='women'>Women</option>
						<option value='kid'>Kid</option>
						<option value='unisex'>Unisex</option>
					</select>
				</div>

				<div className='mb-2 flex flex-col'>
					<span>Categoria</span>
					<select
						className='rounded-md border bg-gray-200 p-2'
						{...register('categoryId', { required: true })}
					>
						<option value=''>[Seleccione]</option>
						{categories.map((c) => (
							<option
								key={c.id}
								value={c.id}
							>
								{c.name}
							</option>
						))}
					</select>
				</div>

				<button
					disabled={!isValid}
					className='btn-primary w-full'
				>
					Guardar
				</button>
			</div>

			{/* Selector de tallas y fotos */}
			<div className='w-full'>
				<div className='mb-2 flex flex-col'>
					<span>Inventario</span>
					<input
						type='number'
						className='rounded-md border bg-gray-200 p-2'
						{...register('inStock', { required: true, min: 0 })}
					/>
				</div>
				{/* As checkboxes */}
				<div className='flex flex-col'>
					<span>Tallas</span>
					<div className='flex flex-wrap gap-2'>
						{sizes.map((size) => (
							<button
								type='button'
								key={size}
								onClick={() => onSizeChange(size)}
								className={clsx(
									'flex size-10 items-center justify-center rounded-md border',
									{
										'bg-blue-500 text-white': sizesSelected.includes(size),
									},
								)}
							>
								<span>{size}</span>
							</button>
						))}
					</div>

					<div className='mb-2 flex flex-col'>
						<span>Fotos</span>
						<input
							{...register('images')}
							type='file'
							multiple
							className='rounded-md border-b border-gray-900 bg-gray-200 p-2'
							accept='image/png, image/jpeg, image/jfif'
						/>
					</div>

					<div className='grid-col-1 grid gap-4 md:grid-cols-3'>
						{product?.productImage?.map((img) => (
							<div key={img.id}>
								<ProductImage
									src={img.url}
									alt={product?.title ?? ''}
									width={300}
									height={300}
									className='rounded-t-md shadow-md'
								/>
								<button
									type='button'
									onClick={() => deleteProductImage(img.id, img.url)}
									className='btn-danger w-full rounded-b-xl'
								>
									Eliminar
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</form>
	);
};
